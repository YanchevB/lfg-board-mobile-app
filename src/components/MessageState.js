import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '../theme';

// A short centered message: not found, nothing here yet, logged out
export default function MessageState({ message }) {
    return (
        <View style={styles.container}>
            <Text style={styles.message}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
    },
    message: {
        textAlign: 'center',
        fontSize: 15,
        lineHeight: 22,
        color: colors.muted,
        fontFamily: fonts.regular,
    },
});
