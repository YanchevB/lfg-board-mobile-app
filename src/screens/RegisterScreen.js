import { KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppButton from '../components/AppButton';
import FieldError from '../components/FieldError';
import FormField from '../components/FormField';
import Icon from '../components/Icon';
import useForm from '../hooks/useForm';
import supabase from '../lib/supabase';
import { colors, fonts } from '../theme';
import registerValidate from '../utils/registerValidate';

export default function RegisterScreen({ navigation }) {
    const { formData, fieldError, error, isSubmitting, changeHandler, submitHandler } = useForm(
        { username: '', email: '', password: '', confirmPassword: '' },
        registerValidate,
        async (values) => {
            const username = values.username.trim();

            // Checked before signUp, because a taken username otherwise only comes back as "Database error saving new user"
            const { data: takenProfile, error: profileError } = await supabase
                .from('profiles')
                .select('id')
                .eq('username', username)
                .maybeSingle();

            if (profileError) {
                throw profileError;
            }

            if (takenProfile) {
                return { username: 'Username is already taken' };
            }

            const { error: signUpError } = await supabase.auth.signUp({
                email: values.email.trim(),
                password: values.password,
                options: {
                    data: { username },
                },
            });

            if (signUpError) {
                if (signUpError.code === 'user_already_exists') {
                    return { email: 'Email is already registered' };
                }

                throw signUpError;
            }
        },
    );

    return (
        <SafeAreaView style={styles.screen} edges={['top']}>
            <KeyboardAvoidingView style={styles.screen} behavior="padding">
                <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
                    <Pressable accessibilityRole="button" onPress={() => navigation.goBack()} style={styles.back}>
                        <Icon name="chevronLeft" size={22} color={colors.accent} strokeWidth={2.5} />
                        <Text style={styles.backLabel}>Log in</Text>
                    </Pressable>

                    <View style={styles.titles}>
                        <Text style={styles.title}>Create account</Text>
                        <Text style={styles.subtitle}>Same account works on the LFG Board website.</Text>
                    </View>

                    <View style={styles.form}>
                        <FormField
                            label="Username"
                            value={formData.username}
                            onChangeText={(text) => changeHandler('username', text)}
                            error={fieldError.username}
                            autoCapitalize="none"
                        />
                        <FormField
                            label="Email"
                            value={formData.email}
                            onChangeText={(text) => changeHandler('email', text)}
                            error={fieldError.email}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                        />
                        <FormField
                            label="Password"
                            value={formData.password}
                            onChangeText={(text) => changeHandler('password', text)}
                            error={fieldError.password}
                            secureTextEntry
                            autoCapitalize="none"
                        />
                        <FormField
                            label="Confirm password"
                            value={formData.confirmPassword}
                            onChangeText={(text) => changeHandler('confirmPassword', text)}
                            error={fieldError.confirmPassword}
                            secureTextEntry
                            autoCapitalize="none"
                        />
                        {error && <FieldError message={error} />}
                        <AppButton
                            title={isSubmitting ? 'Creating account…' : 'Create account'}
                            onPress={submitHandler}
                            disabled={isSubmitting}
                            style={styles.submit}
                        />
                    </View>

                    <View style={styles.spacer} />

                    <Text style={styles.footer}>
                        Already have an account?{' '}
                        <Text style={styles.link} onPress={() => navigation.goBack()}>Log in</Text>
                    </Text>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    content: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    back: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        gap: 2,
        minHeight: 44,
        marginLeft: -12,
        paddingHorizontal: 8,
    },
    backLabel: {
        fontSize: 16,
        color: colors.accent,
        fontFamily: fonts.semibold,
    },
    titles: {
        gap: 6,
        marginTop: 12,
        marginBottom: 24,
    },
    title: {
        fontSize: 30,
        lineHeight: 35,
        color: colors.text,
        fontFamily: fonts.extrabold,
    },
    subtitle: {
        fontSize: 15,
        lineHeight: 22,
        color: colors.muted,
        fontFamily: fonts.regular,
    },
    form: {
        gap: 16,
    },
    submit: {
        marginTop: 8,
    },
    spacer: {
        flex: 1,
        minHeight: 24,
    },
    footer: {
        textAlign: 'center',
        fontSize: 15,
        color: colors.muted,
        fontFamily: fonts.regular,
    },
    link: {
        color: colors.accent,
        fontFamily: fonts.bold,
    },
});
