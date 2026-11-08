import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, fonts } from '../theme';

export default function LargeHeader({ eyebrow, title, right, paddingBottom = 16 }) {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.header, { paddingTop: insets.top + 4, paddingBottom }]}>
            <View style={styles.titles}>
                {eyebrow && <Text style={styles.eyebrow}>{eyebrow}</Text>}
                <Text style={styles.title}>{title}</Text>
            </View>
            {right}
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: 12,
        paddingHorizontal: 20,
    },
    titles: {
        gap: 2,
    },
    eyebrow: {
        fontSize: 13,
        letterSpacing: 0.52,
        textTransform: 'uppercase',
        color: colors.muted,
        fontFamily: fonts.semibold,
    },
    title: {
        fontSize: 30,
        lineHeight: 35,
        color: colors.text,
        fontFamily: fonts.extrabold,
    },
});
