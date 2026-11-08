import { StyleSheet, Text, View } from 'react-native';

import Icon from './Icon';
import { colors, fonts } from '../theme';

export default function FieldError({ message }) {
    return (
        <View style={styles.row}>
            <Icon name="alert" size={14} color={colors.dangerText} strokeWidth={2.5} />
            <Text style={styles.message}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    message: {
        flex: 1,
        fontSize: 13,
        color: colors.dangerText,
        fontFamily: fonts.regular,
    },
});
