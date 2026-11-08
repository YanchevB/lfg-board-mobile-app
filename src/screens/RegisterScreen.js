import { useState } from 'react';
import { KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppButton from '../components/AppButton';
import FormField from '../components/FormField';
import Icon from '../components/Icon';
import { colors, fonts } from '../theme';

export default function RegisterScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    function submit() {
        const newErrors = {};

        if (!username.trim()) newErrors.username = 'Username is required';
        if (!email.trim()) newErrors.email = 'Email is required';

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (confirmPassword !== password) newErrors.confirmPassword = "Passwords don't match";

        // Creating the account comes with AuthContext (Leg 2)
        setErrors(newErrors);
    }

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
                            value={username}
                            onChangeText={setUsername}
                            error={errors.username}
                            autoCapitalize="none"
                        />
                        <FormField
                            label="Email"
                            value={email}
                            onChangeText={setEmail}
                            error={errors.email}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                        />
                        <FormField
                            label="Password"
                            value={password}
                            onChangeText={setPassword}
                            error={errors.password}
                            secureTextEntry
                            autoCapitalize="none"
                        />
                        <FormField
                            label="Confirm password"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            error={errors.confirmPassword}
                            secureTextEntry
                            autoCapitalize="none"
                        />
                        <AppButton title="Create account" onPress={submit} style={styles.submit} />
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
