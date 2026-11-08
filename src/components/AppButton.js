import { Pressable, StyleSheet, Text } from 'react-native';

import Icon from './Icon';
import { colors, fonts } from '../theme';

const VARIANTS = {
    primary: { backgroundColor: colors.accent, color: colors.onAccent },
    secondary: { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text },
    outline: { backgroundColor: 'transparent', borderColor: colors.border, color: colors.text },
    danger: { backgroundColor: colors.dangerSoft, color: colors.dangerText },
};

const SIZES = {
    lg: { height: 52, fontSize: 16, iconSize: 18 },
    md: { height: 48, fontSize: 15, iconSize: 18 },
    sm: { height: 44, fontSize: 14, iconSize: 16 },
};

export default function AppButton({ title, icon, onPress, variant = 'primary', size = 'lg', disabled = false, style }) {
    const { color, borderColor, backgroundColor } = VARIANTS[variant];
    const { height, fontSize, iconSize } = SIZES[size];

    return (
        <Pressable
            accessibilityRole="button"
            onPress={onPress}
            disabled={disabled}
            style={({ pressed }) => [
                styles.button,
                { height, backgroundColor },
                borderColor && { borderColor, borderWidth: 1 },
                (pressed || disabled) && { opacity: disabled ? 0.5 : 0.8 },
                style,
            ]}
        >
            {icon && <Icon name={icon} size={iconSize} color={color} strokeWidth={2.25} />}
            <Text style={[styles.title, { color, fontSize }]}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingHorizontal: 16,
        borderRadius: 10,
    },
    title: {
        fontFamily: fonts.bold,
    },
});
