import { DarkTheme } from '@react-navigation/native';

export const colors = {
    background: '#14161c',
    surface: '#1b1e26',
    surfaceRaised: '#232733',
    border: '#333947',
    borderDashed: '#6c7284',
    text: '#eef0f4',
    muted: '#9aa1b1',
    accent: '#6c8cff',
    accentLight: '#86a0ff',
    accentSoft: 'rgba(108,140,255,0.16)',
    accentSelected: 'rgba(108,140,255,0.18)',
    onAccent: '#0d1020',
    success: '#3fb27f',
    successSoft: 'rgba(63,178,127,0.16)',
    warning: '#d9a441',
    warningSoft: 'rgba(217,164,65,0.16)',
    neutral: '#b4b9c5',
    neutralSoft: 'rgba(138,143,156,0.18)',
    danger: '#e0616b',
    dangerText: '#ea7a83',
    dangerSoft: 'rgba(224,97,107,0.14)',
    dangerTint: 'rgba(224,97,107,0.08)',
    overlay: 'rgba(5,6,10,0.7)',
};

// Use fontFamily on its own: adding fontWeight to a custom font breaks it on Android
export const fonts = {
    regular: 'Inter_400Regular',
    semibold: 'Inter_600SemiBold',
    bold: 'Inter_700Bold',
    extrabold: 'Inter_800ExtraBold',
};

export const navigationTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        primary: colors.accent,
        background: colors.background,
        card: colors.surface,
        text: colors.text,
        border: colors.border,
        notification: colors.danger,
    },
    fonts: {
        regular: { fontFamily: fonts.regular, fontWeight: 'normal' },
        medium: { fontFamily: fonts.semibold, fontWeight: 'normal' },
        bold: { fontFamily: fonts.bold, fontWeight: 'normal' },
        heavy: { fontFamily: fonts.extrabold, fontWeight: 'normal' },
    },
};
