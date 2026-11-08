import { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppButton from '../components/AppButton';
import FormField from '../components/FormField';
import { colors, fonts } from '../theme';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    function submit() {
        const newErrors = {};

        if (!email.trim()) newErrors.email = 'Email is required';
        if (!password) newErrors.password = 'Password is required';

        // Signing in comes with AuthContext (Leg 2)
        setErrors(newErrors);
    }

    return (
        <SafeAreaView style={styles.screen} edges={['top']}>
            <KeyboardAvoidingView style={styles.screen} behavior="padding">
                <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
                    <View style={styles.main}>
                        <View style={styles.intro}>
                            <View style={styles.logo}>
                                <Text style={styles.logoText}>LFG</Text>
                            </View>
                            <View style={styles.titles}>
                                <Text style={styles.title}>Welcome back</Text>
                                <Text style={styles.subtitle}>Log in to find people to play with, right now.</Text>
                            </View>
                        </View>

                        <View style={styles.form}>
                            <FormField
                                large
                                label="Email"
                                placeholder="you@example.com"
                                value={email}
                                onChangeText={setEmail}
                                error={errors.email}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoComplete="email"
                            />
                            <FormField
                                large
                                label="Password"
                                value={password}
                                onChangeText={setPassword}
                                error={errors.password}
                                secureTextEntry
                                canRevealPassword
                                autoCapitalize="none"
                            />
                            <AppButton title="Log in" onPress={submit} style={styles.submit} />
                        </View>
                    </View>

                    <Text style={styles.footer}>
                        No account yet?{' '}
                        <Text style={styles.link} onPress={() => navigation.navigate('Register')}>Create one</Text>
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
    main: {
        flex: 1,
        justifyContent: 'center',
        gap: 32,
    },
    intro: {
        gap: 16,
    },
    logo: {
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
        backgroundColor: colors.accent,
    },
    logoText: {
        fontSize: 18,
        letterSpacing: 0.36,
        color: colors.onAccent,
        fontFamily: fonts.extrabold,
    },
    titles: {
        gap: 6,
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
        gap: 18,
    },
    submit: {
        marginTop: 6,
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
