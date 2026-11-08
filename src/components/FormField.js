import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import FieldError from './FieldError';
import Icon from './Icon';
import { colors, fonts } from '../theme';

export default function FormField({ label, hint, error, large = false, canRevealPassword = false, multiline = false, secureTextEntry, ...inputProps }) {
    const [isFocused, setIsFocused] = useState(false);
    const [isRevealed, setIsRevealed] = useState(false);

    return (
        <View style={[styles.field, large && styles.fieldLarge]}>
            <Text style={styles.label}>
                {label}
                {hint && <Text style={styles.hint}> {hint}</Text>}
            </Text>

            <View
                style={[
                    styles.box,
                    large && styles.boxLarge,
                    multiline && styles.boxMultiline,
                    error && styles.boxError,
                    isFocused && styles.boxFocused,
                ]}
            >
                <TextInput
                    {...inputProps}
                    multiline={multiline}
                    secureTextEntry={secureTextEntry && !isRevealed}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholderTextColor={colors.muted}
                    selectionColor={colors.accent}
                    keyboardAppearance="dark"
                    style={[styles.input, multiline && styles.inputMultiline, isFocused && styles.inputFocused]}
                />

                {canRevealPassword && (
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={isRevealed ? 'Hide password' : 'Show password'}
                        onPress={() => setIsRevealed((current) => !current)}
                        style={styles.reveal}
                    >
                        <Icon name={isRevealed ? 'eyeOff' : 'eye'} size={20} color={colors.muted} />
                    </Pressable>
                )}
            </View>

            {error && <FieldError message={error} />}
        </View>
    );
}

const styles = StyleSheet.create({
    field: {
        gap: 6,
    },
    fieldLarge: {
        gap: 8,
    },
    label: {
        fontSize: 14,
        color: colors.text,
        fontFamily: fonts.semibold,
    },
    hint: {
        color: colors.muted,
        fontFamily: fonts.regular,
    },
    box: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
    },
    boxLarge: {
        height: 52,
    },
    boxMultiline: {
        height: 104,
        alignItems: 'stretch',
    },
    boxError: {
        borderColor: colors.danger,
        backgroundColor: colors.dangerTint,
    },
    boxFocused: {
        borderWidth: 2,
        borderColor: colors.accent,
    },
    input: {
        flex: 1,
        minWidth: 0,
        height: '100%',
        paddingHorizontal: 16,
        fontSize: 16,
        color: colors.text,
        fontFamily: fonts.regular,
    },
    inputMultiline: {
        paddingVertical: 14,
        textAlignVertical: 'top',
    },
    // Keeps the text still when the border gets 1px thicker
    inputFocused: {
        paddingHorizontal: 15,
    },
    reveal: {
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
