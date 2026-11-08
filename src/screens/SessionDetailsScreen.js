import { useLayoutEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import AppButton from '../components/AppButton';
import Avatar from '../components/Avatar';
import Badge, { StatusBadge } from '../components/Badge';
import Icon from '../components/Icon';
import SectionLabel from '../components/SectionLabel';
import { currentUser, getSession } from '../data/sampleData';
import { colors, fonts } from '../theme';
import { getSessionStatus } from '../utils/sessionStatus';
import { timeAgo } from '../utils/time';

const MAX_EMPTY_SEATS = 3;

export default function SessionDetailsScreen({ navigation, route }) {
    const { id } = route.params;
    const session = getSession(id);

    const isHost = session?.owner_id === currentUser.id;

    useLayoutEffect(() => {
        if (isHost) {
            navigation.setOptions({
                headerRight: () => (
                    <Pressable
                        accessibilityRole="button"
                        onPress={() => navigation.navigate('EditSession', { id })}
                        style={styles.edit}
                    >
                        <Text style={styles.editLabel}>Edit</Text>
                    </Pressable>
                ),
            });
        }
    }, [navigation, id, isHost]);

    if (!session) {
        return (
            <View style={styles.notFound}>
                <Text style={styles.notFoundText}>This session doesn&apos;t exist anymore.</Text>
            </View>
        );
    }

    const playerCount = session.players.length;
    const status = getSessionStatus(session, playerCount);
    const openSlots = session.slots - playerCount;

    return (
        <View style={styles.screen}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.intro}>
                    <View style={styles.badges}>
                        <StatusBadge status={status} />
                        {isHost
                            ? <Badge label="You're hosting" />
                            : <Text style={styles.posted}>Posted {timeAgo(session.created_at)}</Text>}
                    </View>
                    <Text style={styles.game}>{session.game}</Text>
                    {session.description && <Text style={styles.description}>{session.description}</Text>}
                </View>

                <View style={styles.stats}>
                    <Stat label="Players" value={`${playerCount} / ${session.slots}`} />
                    <Stat label="Platform" value={session.platform} />
                    <Stat label="Mic" value={session.mic_required ? 'Required' : 'Optional'} />
                </View>

                <View style={styles.section}>
                    <SectionLabel>
                        Players{openSlots > 0 ? ` · ${openSlots} ${openSlots === 1 ? 'slot' : 'slots'} left` : ''}
                    </SectionLabel>

                    <View style={styles.players}>
                        {session.players.map((player, index) => (
                            <PlayerRow
                                key={player.id}
                                player={player}
                                isHost={player.id === session.owner_id}
                                isYou={player.id === currentUser.id}
                                showDivider={index < playerCount - 1 || openSlots > 0}
                                onPress={() => navigation.navigate('PlayerProfile', { id: player.id })}
                            />
                        ))}

                        {openSlots > 0 && (
                            <View style={styles.openSlots}>
                                <View style={styles.seats}>
                                    {Array.from({ length: Math.min(openSlots, MAX_EMPTY_SEATS) }, (_, index) => (
                                        <View key={index} style={[styles.seat, index > 0 && styles.seatOverlap]} />
                                    ))}
                                </View>
                                <Text style={styles.openSlotsText}>
                                    {openSlots} open {openSlots === 1 ? 'slot' : 'slots'}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>

            {/* Session actions are connected on Sat Nov 21 and Sun Nov 22 */}
            <View style={styles.footer}>
                {isHost ? (
                    <>
                        <AppButton title="Close session" icon="lock" variant="secondary" style={styles.footerMain} />
                        <Pressable accessibilityRole="button" accessibilityLabel="Delete session" style={styles.delete}>
                            <Icon name="trashLines" size={20} color={colors.dangerText} strokeWidth={2.25} />
                        </Pressable>
                    </>
                ) : (
                    <JoinButton session={session} status={status} />
                )}
            </View>
        </View>
    );
}

function JoinButton({ session, status }) {
    if (session.players.some((player) => player.id === currentUser.id)) {
        return <AppButton title="Leave session" variant="secondary" style={styles.footerMain} />;
    }

    if (status !== 'open') {
        return <AppButton title={status === 'full' ? 'Session full' : 'Session closed'} disabled style={styles.footerMain} />;
    }

    return <AppButton title="Join session" style={styles.footerMain} />;
}

function Stat({ label, value }) {
    return (
        <View style={styles.stat}>
            <Text style={styles.statLabel}>{label}</Text>
            <Text style={styles.statValue} numberOfLines={1} adjustsFontSizeToFit>{value}</Text>
        </View>
    );
}

function PlayerRow({ player, isHost, isYou, showDivider, onPress }) {
    const content = (
        <>
            <Avatar name={player.username} highlighted={isHost} />
            <Text style={styles.playerName} numberOfLines={1}>{player.username}</Text>
            {isYou && <Badge label="You" tone="plain" square />}
            {isHost && <Badge label="Host" square />}
            {!isYou && <Icon name="chevronRight" size={18} color={colors.muted} />}
        </>
    );

    if (isYou) {
        return <View style={[styles.player, showDivider && styles.divider]}>{content}</View>;
    }

    return (
        <Pressable onPress={onPress} style={[styles.player, showDivider && styles.divider]}>
            {content}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    content: {
        gap: 20,
        paddingVertical: 20,
        paddingHorizontal: 16,
    },
    edit: {
        justifyContent: 'center',
        minHeight: 44,
        paddingHorizontal: 10,
    },
    editLabel: {
        fontSize: 16,
        color: colors.accent,
        fontFamily: fonts.semibold,
    },
    notFound: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
    },
    notFoundText: {
        textAlign: 'center',
        fontSize: 15,
        color: colors.muted,
        fontFamily: fonts.regular,
    },
    intro: {
        gap: 10,
    },
    badges: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    posted: {
        fontSize: 13,
        color: colors.muted,
        fontFamily: fonts.regular,
    },
    game: {
        fontSize: 28,
        lineHeight: 32,
        color: colors.text,
        fontFamily: fonts.extrabold,
    },
    description: {
        fontSize: 15,
        lineHeight: 22,
        color: colors.muted,
        fontFamily: fonts.regular,
    },
    stats: {
        flexDirection: 'row',
        gap: 8,
    },
    stat: {
        flex: 1,
        gap: 4,
        padding: 12,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 12,
    },
    statLabel: {
        fontSize: 12,
        color: colors.muted,
        fontFamily: fonts.regular,
    },
    statValue: {
        fontSize: 17,
        color: colors.text,
        fontFamily: fonts.bold,
    },
    section: {
        gap: 10,
    },
    players: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 14,
        overflow: 'hidden',
    },
    player: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        minHeight: 56,
        paddingHorizontal: 14,
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    playerName: {
        flex: 1,
        fontSize: 15,
        color: colors.text,
        fontFamily: fonts.semibold,
    },
    openSlots: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        minHeight: 52,
        paddingHorizontal: 14,
    },
    seats: {
        flexDirection: 'row',
    },
    seat: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 1.5,
        borderStyle: 'dashed',
        borderColor: colors.borderDashed,
    },
    seatOverlap: {
        marginLeft: -22,
    },
    openSlotsText: {
        fontSize: 14,
        color: colors.muted,
        fontFamily: fonts.regular,
    },
    footer: {
        flexDirection: 'row',
        gap: 10,
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: colors.background,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    footerMain: {
        flex: 1,
    },
    delete: {
        width: 52,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: colors.dangerSoft,
    },
});
