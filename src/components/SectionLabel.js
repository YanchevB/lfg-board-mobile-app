import { StyleSheet, Text } from 'react-native';

import { colors, fonts } from '../theme';

export default function SectionLabel({ children }) {
    return <Text style={styles.label}>{children}</Text>;
}

const styles = StyleSheet.create({
    label: {
        fontSize: 13,
        letterSpacing: 0.52,
        textTransform: 'uppercase',
        color: colors.muted,
        fontFamily: fonts.bold,
    },
});
