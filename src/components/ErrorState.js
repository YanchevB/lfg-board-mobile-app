import { ScrollView, StyleSheet, Text, View } from 'react-native';

import AppButton from './AppButton';
import Icon from './Icon';
import { appRefreshControl } from './appRefreshControl';
import { colors, fonts } from '../theme';

export default function ErrorState({ title, isRefreshing = false, onRetry }) {
    return (
        <ScrollView contentContainerStyle={styles.container} refreshControl={appRefreshControl(isRefreshing, onRetry)}>
            <View style={styles.icon}>
                <Icon name="wifiOff" size={30} color={colors.dangerText} />
            </View>
            <View style={styles.text}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.message}>Check your connection and try again. You can also pull down to refresh.</Text>
            </View>
            <AppButton title="Try again" icon="refresh" variant="outline" size="md" disabled={isRefreshing} onPress={onRetry} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        paddingHorizontal: 40,
        paddingBottom: 60,
    },
    icon: {
        width: 64,
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 32,
        backgroundColor: colors.dangerSoft,
    },
    text: {
        gap: 8,
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        color: colors.text,
        fontFamily: fonts.bold,
    },
    message: {
        textAlign: 'center',
        fontSize: 15,
        lineHeight: 22,
        color: colors.muted,
        fontFamily: fonts.regular,
    },
});
