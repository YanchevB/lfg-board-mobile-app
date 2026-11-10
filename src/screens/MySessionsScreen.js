import { useCallback } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { getHostedSessions, getJoinedSessions } from '../api/sessions';
import AppButton from '../components/AppButton';
import { appRefreshControl } from '../components/appRefreshControl';
import { StatusBadge } from '../components/Badge';
import ErrorState from '../components/ErrorState';
import Icon from '../components/Icon';
import LargeHeader from '../components/LargeHeader';
import LoadingState from '../components/LoadingState';
import MessageState from '../components/MessageState';
import SectionLabel from '../components/SectionLabel';
import useAuth from '../hooks/useAuth';
import useFetch from '../hooks/useFetch';
import { colors, fonts } from '../theme';
import { getSessionStatus } from '../utils/sessionStatus';

export default function MySessionsScreen({ navigation }) {
    const { user } = useAuth();

    return (
        <View style={styles.screen}>
            <LargeHeader title="My Sessions" />
            {user
                ? <MySessionsList userId={user.id} navigation={navigation} />
                : <MessageState message="Log in to see the sessions you host and join." />}
        </View>
    );
}

function MySessionsList({ userId, navigation }) {
    const fetchMySessions = useCallback(async () => {
        const [hosting, joined] = await Promise.all([getHostedSessions(userId), getJoinedSessions(userId)]);

        return { hosting, joined };
    }, [userId]);
    const { data, error, isLoading, isRefreshing, refresh } = useFetch(fetchMySessions);

    if (isLoading) {
        return <LoadingState />;
    }

    if (error) {
        return <ErrorState title="Couldn't load your sessions" isRefreshing={isRefreshing} onRetry={refresh} />;
    }

    const { hosting, joined } = data;

    function openSession(id) {
        navigation.navigate('SessionDetails', { id });
    }

    return (
        <ScrollView contentContainerStyle={styles.content} refreshControl={appRefreshControl(isRefreshing, refresh)}>
            <View style={styles.section}>
                <SectionHeading title="Hosting" count={hosting.length} />
                {hosting.map((session) => (
                    <SessionRow
                        key={session.id}
                        session={session}
                        detail={session.mic_required ? 'Mic' : 'No mic'}
                        onPress={() => openSession(session.id)}
                    />
                ))}
            </View>

            <View style={styles.section}>
                <SectionHeading title="Joined" count={joined.length} />
                {joined.map((session) => (
                    <SessionRow
                        key={session.id}
                        session={session}
                        detail={`Hosted by ${session.host.username}`}
                        onPress={() => openSession(session.id)}
                    />
                ))}
            </View>

            <View style={styles.promo}>
                <Text style={styles.promoText}>Want more people? Host another lobby and it shows up here.</Text>
                <AppButton
                    title="Host a session"
                    icon="plus"
                    variant="outline"
                    size="sm"
                    onPress={() => navigation.navigate('CreateSession')}
                />
            </View>
        </ScrollView>
    );
}

function SectionHeading({ title, count }) {
    return (
        <View style={styles.heading}>
            <SectionLabel>{title}</SectionLabel>
            <View style={styles.count}>
                <Text style={styles.countText}>{count}</Text>
            </View>
        </View>
    );
}

function SessionRow({ session, detail, onPress }) {
    const playerCount = session.players.length;

    return (
        <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
            <View style={styles.rowText}>
                <View style={styles.rowTitle}>
                    <Text style={styles.game} numberOfLines={1}>{session.game}</Text>
                    <StatusBadge status={getSessionStatus(session, playerCount)} small />
                </View>
                <Text style={styles.meta} numberOfLines={1}>
                    {session.platform} · {playerCount}/{session.slots} players · {detail}
                </Text>
            </View>
            <Icon name="chevronRight" size={18} color={colors.muted} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    content: {
        gap: 24,
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    section: {
        gap: 10,
    },
    heading: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    count: {
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 20,
        height: 20,
        paddingHorizontal: 6,
        borderRadius: 10,
        backgroundColor: colors.surfaceRaised,
    },
    countText: {
        fontSize: 12,
        color: colors.text,
        fontFamily: fonts.bold,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        paddingVertical: 14,
        paddingHorizontal: 16,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 14,
    },
    pressed: {
        opacity: 0.8,
    },
    rowText: {
        flex: 1,
        gap: 6,
    },
    rowTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    game: {
        flexShrink: 1,
        fontSize: 16,
        color: colors.text,
        fontFamily: fonts.bold,
    },
    meta: {
        fontSize: 13,
        color: colors.muted,
        fontFamily: fonts.regular,
    },
    promo: {
        alignItems: 'center',
        gap: 12,
        paddingVertical: 24,
        paddingHorizontal: 20,
        borderWidth: 1.5,
        borderStyle: 'dashed',
        borderColor: colors.border,
        borderRadius: 14,
    },
    promoText: {
        textAlign: 'center',
        fontSize: 14,
        lineHeight: 21,
        color: colors.muted,
        fontFamily: fonts.regular,
    },
});
