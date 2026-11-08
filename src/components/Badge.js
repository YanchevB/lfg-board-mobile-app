import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '../theme';

const TONES = {
    open: { backgroundColor: colors.successSoft, color: colors.success },
    full: { backgroundColor: colors.warningSoft, color: colors.warning },
    closed: { backgroundColor: colors.neutralSoft, color: colors.neutral },
    accent: { backgroundColor: colors.accentSoft, color: colors.accentLight },
    plain: { backgroundColor: colors.surfaceRaised, color: colors.text },
};

const STATUS_LABELS = { open: 'Open', full: 'Full', closed: 'Closed' };

export default function Badge({ label, tone = 'accent', small = false, square = false }) {
    const { backgroundColor, color } = TONES[tone];

    return (
        <View style={[styles.badge, { backgroundColor }, small && styles.small, square && styles.square]}>
            <Text style={[styles.label, { color }, small && styles.labelSmall]}>{label}</Text>
        </View>
    );
}

export function StatusBadge({ status, small }) {
    return <Badge label={STATUS_LABELS[status]} tone={status} small={small} />;
}

const styles = StyleSheet.create({
    badge: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 999,
    },
    small: {
        paddingVertical: 3,
        paddingHorizontal: 8,
    },
    square: {
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderRadius: 6,
    },
    label: {
        fontSize: 12,
        fontFamily: fonts.bold,
    },
    labelSmall: {
        fontSize: 11,
    },
});
