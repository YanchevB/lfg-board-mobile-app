import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Icon from './Icon';
import { colors, fonts } from '../theme';

export const HEADER_BAR_HEIGHT = 48;

export default function AppHeader({ navigation, route, options, back }) {
    const insets = useSafeAreaInsets();

    const isModal = options.presentation === 'modal';
    const title = options.title ?? route.name;
    const backLabel = isModal ? 'Cancel' : (options.headerBackTitle ?? back?.title ?? 'Back');

    const paddingTop = isModal && Platform.OS === 'ios' ? 0 : insets.top;

    return (
        <View style={[styles.header, { paddingTop }]}>
            <View style={styles.bar}>
                <Text style={styles.title} numberOfLines={1}>{title}</Text>

                {back && (
                    <Pressable accessibilityRole="button" onPress={navigation.goBack} style={styles.back}>
                        {!isModal && <Icon name="chevronLeft" size={22} color={colors.accent} strokeWidth={2.5} />}
                        <Text style={styles.backLabel}>{backLabel}</Text>
                    </Pressable>
                )}

                <View style={styles.right}>{options.headerRight?.({ tintColor: colors.accent, canGoBack: Boolean(back) })}</View>
            </View>
        </View>
    );
}

export const stackScreenOptions = {
    header: (props) => <AppHeader {...props} />,
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: HEADER_BAR_HEIGHT,
        paddingHorizontal: 8,
    },
    title: {
        position: 'absolute',
        left: 96,
        right: 96,
        textAlign: 'center',
        fontSize: 17,
        color: colors.text,
        fontFamily: fonts.bold,
    },
    back: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        minHeight: 44,
        paddingHorizontal: 8,
    },
    backLabel: {
        fontSize: 16,
        color: colors.accent,
        fontFamily: fonts.semibold,
    },
    right: {
        marginLeft: 'auto',
    },
});
