import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { deleteSession, getSession, joinSession, leaveSession, setSessionClosed } from '../api/sessions';
import AppButton from '../components/AppButton';
import { appRefreshControl } from '../components/appRefreshControl';
import Avatar from '../components/Avatar';
import Badge, { StatusBadge } from '../components/Badge';
import ErrorState from '../components/ErrorState';
import Icon from '../components/Icon';
import LoadingState from '../components/LoadingState';
import MessageState from '../components/MessageState';
import SectionLabel from '../components/SectionLabel';
import useAuth from '../hooks/useAuth';
import useFetch from '../hooks/useFetch';
import { colors, fonts } from '../theme';
import { getSessionStatus } from '../utils/sessionStatus';
import { timeAgo } from '../utils/time';

const MAX_EMPTY_SEATS = 3;

export default function SessionDetailsScreen({ navigation, route }) {
    const { id, savedAt } = route.params;
    const { user } = useAuth();

    const fetchSession = useCallback(() => getSession(id), [id]);
    const { data: session, error, isLoading, isRefreshing, refresh } = useFetch(fetchSession);

    useEffect(() => {
        if (savedAt) refresh();
    }, [savedAt, refresh]);

    // 'join' | 'leave' | 'close' | 'reopen' | 'delete' while a request runs, so every action button is disabled
    const [pendingAction, setPendingAction] = useState(null);
    const isActing = pendingAction !== null;

    const isHost = Boolean(user) && session?.owner_id === user.id;

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

    function confirmDelete() {
        Alert.alert('Delete this session?', 'Everyone who joined loses their spot. This can\'t be undone.', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', style: 'destructive', onPress: deleteHandler },
        ]);
    }

    async function deleteHandler() {
        setPendingAction('delete');

        try {
            await deleteSession(id);
            navigation.goBack();
        } catch (err) {
            setPendingAction(null);
            Alert.alert('Couldn\'t delete this session', err.message);
        }
    }

    // Runs the request, then reloads the session so status, players and buttons match the database
    async function runAction(action, errorTitle, request) {
        setPendingAction(action);

        try {
            await request();
            await refresh();
        } catch (err) {
            Alert.alert(errorTitle, err.message);
        } finally {
            setPendingAction(null);
        }
    }

    const joinHandler = () => runAction('join', 'Couldn\'t join this session', () => joinSession(id));
    const leaveHandler = () => runAction('leave', 'Couldn\'t leave this session', () => leaveSession(id, user.id));
    const closeHandler = () => runAction('close', 'Couldn\'t close this session', () => setSessionClosed(id, true));
    const reopenHandler = () => runAction('reopen', 'Couldn\'t reopen this session', () => setSessionClosed(id, false));

    if (isLoading) {
        return <LoadingState />;
    }

    if (error) {
        return <ErrorState title="Couldn't load this session" isRefreshing={isRefreshing} onRetry={refresh} />;
    }

    if (!session) {
        return <MessageState message="This session doesn't exist anymore." />;
    }

    const playerCount = session.players.length;
    const status = getSessionStatus(session, playerCount);
    const openSlots = session.slots - playerCount;

    return (
        <View style={styles.screen}>
            <ScrollView contentContainerStyle={styles.content} refreshControl={appRefreshControl(isRefreshing, refresh)}>
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
                                isYou={player.id === user?.id}
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

            <View style={styles.footer}>
                {isHost ? (
                    <View style={styles.footerRow}>
                        {session.is_closed ? (
                            <AppButton
                                title={pendingAction === 'reopen' ? 'Reopening…' : 'Reopen session'}
                                icon="unlock"
                                variant="secondary"
                                disabled={isActing}
                                onPress={reopenHandler}
                                style={styles.footerMain}
                            />
                        ) : (
                            <AppButton
                                title={pendingAction === 'close' ? 'Closing…' : 'Close session'}
                                icon="lock"
                                variant="secondary"
                                disabled={isActing}
                                onPress={closeHandler}
                                style={styles.footerMain}
                            />
                        )}
                        <Pressable
                            accessibilityRole="button"
                            accessibilityLabel="Delete session"
                            accessibilityState={{ disabled: isActing }}
                            disabled={isActing}
                            onPress={confirmDelete}
                            style={[styles.delete, isActing && styles.deleteDisabled]}
                        >
                            <Icon name="trashLines" size={20} color={colors.dangerText} strokeWidth={2.25} />
                        </Pressable>
                    </View>
                ) : (
                    <JoinActions
                        session={session}
                        status={status}
                        isMember={session.players.some((player) => player.id === user.id)}
                        pendingAction={pendingAction}
                        onJoin={joinHandler}
                        onLeave={leaveHandler}
                    />
                )}
            </View>
        </View>
    );
}

// A member can always leave, even a closed or full session. Everyone else sees why they can't join.
function JoinActions({ session, status, isMember, pendingAction, onJoin, onLeave }) {
    const isActing = pendingAction !== null;

    if (isMember) {
        return (
            <AppButton
                title={pendingAction === 'leave' ? 'Leaving…' : 'Leave session'}
                variant="danger"
                disabled={isActing}
                onPress={onLeave}
            />
        );
    }

    if (status === 'closed') {
        return (
            <>
                <Text style={styles.footerNote}>The host closed this session. No new players can join.</Text>
                <AppButton title="Session closed" icon="lock" disabled />
            </>
        );
    }

    if (status === 'full') {
        return (
            <>
                <Text style={styles.footerNote}>All {session.slots} slots are taken.</Text>
                <AppButton title="Session full" disabled />
            </>
        );
    }

    return (
        <AppButton
            title={pendingAction === 'join' ? 'Joining…' : 'Join session'}
            icon="plus"
            disabled={isActing}
            onPress={onJoin}
        />
    );
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
        gap: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: colors.background,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    footerRow: {
        flexDirection: 'row',
        gap: 10,
    },
    footerMain: {
        flex: 1,
    },
    footerNote: {
        fontSize: 13,
        textAlign: 'center',
        color: colors.muted,
        fontFamily: fonts.regular,
    },
    delete: {
        width: 52,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: colors.dangerSoft,
    },
    deleteDisabled: {
        opacity: 0.5,
    },
});
