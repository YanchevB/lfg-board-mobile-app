import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '../theme';
import { extractInitial } from '../utils/extractInitial';

export default function Avatar({ name, size = 36, fontSize = 15, highlighted = false, bordered = false }) {
    return (
        <View
            style={[
                styles.circle,
                { width: size, height: size, borderRadius: size / 2 },
                highlighted && styles.highlighted,
                bordered && styles.bordered,
            ]}
        >
            <Text style={[styles.initial, { fontSize }, highlighted && styles.initialHighlighted]}>
                {extractInitial(name)}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    circle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.surfaceRaised,
    },
    highlighted: {
        backgroundColor: colors.accent,
    },
    bordered: {
        borderWidth: 1,
        borderColor: colors.border,
    },
    initial: {
        color: colors.text,
        fontFamily: fonts.extrabold,
    },
    initialHighlighted: {
        color: colors.onAccent,
    },
});
