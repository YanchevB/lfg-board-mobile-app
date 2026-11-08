import { Pressable, StyleSheet, Text, View } from 'react-native';

import Avatar from './Avatar';
import { StatusBadge } from './Badge';
import Icon from './Icon';
import { colors, fonts } from '../theme';
import { getSessionStatus } from '../utils/sessionStatus';

export default function SessionCard({ session, onPress, showHost = true }) {
    const playerCount = session.players.length;
    const status = getSessionStatus(session, playerCount);
    const filledColor = status === 'full' ? colors.warning : colors.accent;

    return (
        <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
            <View style={styles.top}>
                <View style={styles.titles}>
                    <Text style={styles.game}>{session.game}</Text>
                    <Text style={styles.meta}>{session.platform}</Text>
                </View>
                <StatusBadge status={status} />
            </View>

            {session.description && (
                <Text style={styles.description} numberOfLines={2}>{session.description}</Text>
            )}

            <View style={styles.footer}>
                <View style={styles.footerItem}>
                    <View style={styles.dots}>
                        {Array.from({ length: session.slots }, (_, index) => (
                            <View
                                key={index}
                                style={[styles.dot, { backgroundColor: index < playerCount ? filledColor : colors.border }]}
                            />
                        ))}
                    </View>
                    <Text style={styles.count}>{playerCount}/{session.slots}</Text>
                </View>

                <View style={styles.mic}>
                    <Icon
                        name={session.mic_required ? 'mic' : 'micOff'}
                        size={15}
                        color={session.mic_required ? colors.text : colors.muted}
                    />
                    <Text style={[styles.meta, session.mic_required && styles.metaStrong]}>
                        {session.mic_required ? 'Mic' : 'No mic'}
                    </Text>
                </View>

                {showHost && (
                    <View style={[styles.footerItem, styles.host]}>
                        <Avatar name={session.host.username} size={22} fontSize={11} />
                        <Text style={styles.meta}>{session.host.username}</Text>
                    </View>
                )}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        gap: 12,
        padding: 16,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 14,
    },
    pressed: {
        opacity: 0.8,
    },
    top: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 12,
    },
    titles: {
        flex: 1,
        gap: 4,
    },
    game: {
        fontSize: 17,
        lineHeight: 21,
        color: colors.text,
        fontFamily: fonts.bold,
    },
    meta: {
        fontSize: 13,
        color: colors.muted,
        fontFamily: fonts.regular,
    },
    metaStrong: {
        color: colors.text,
    },
    description: {
        fontSize: 14,
        lineHeight: 20,
        color: colors.muted,
        fontFamily: fonts.regular,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
    },
    footerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    dots: {
        flexDirection: 'row',
        gap: 3,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    count: {
        fontSize: 13,
        color: colors.text,
        fontFamily: fonts.semibold,
    },
    mic: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    host: {
        marginLeft: 'auto',
    },
});
