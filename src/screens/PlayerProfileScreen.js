import { useCallback } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { getProfile } from '../api/profiles';
import { getHostedSessions } from '../api/sessions';
import { appRefreshControl } from '../components/appRefreshControl';
import Avatar from '../components/Avatar';
import ErrorState from '../components/ErrorState';
import LoadingState from '../components/LoadingState';
import MessageState from '../components/MessageState';
import SectionLabel from '../components/SectionLabel';
import SessionCard from '../components/SessionCard';
import useFetch from '../hooks/useFetch';
import { colors, fonts } from '../theme';
import { memberSince } from '../utils/time';

export default function PlayerProfileScreen({ navigation, route }) {
    const { id } = route.params;

    const fetchPlayer = useCallback(async () => {
        const [profile, hosting] = await Promise.all([getProfile(id), getHostedSessions(id)]);

        return { profile, hosting };
    }, [id]);
    const { data, error, isLoading, isRefreshing, refresh } = useFetch(fetchPlayer);

    if (isLoading) {
        return <LoadingState />;
    }

    if (error) {
        return <ErrorState title="Couldn't load this player" isRefreshing={isRefreshing} onRetry={refresh} />;
    }

    if (!data.profile) {
        return <MessageState message="This player doesn't exist anymore." />;
    }

    const { profile, hosting } = data;

    return (
        <ScrollView contentContainerStyle={styles.content} refreshControl={appRefreshControl(isRefreshing, refresh)}>
            <View style={styles.identity}>
                <Avatar name={profile.username} size={104} fontSize={40} bordered />
                <View style={styles.names}>
                    <Text style={styles.username}>{profile.username}</Text>
                    <Text style={styles.muted}>Member since {memberSince(profile.created_at)}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <SectionLabel>Hosting</SectionLabel>
                {hosting.map((session) => (
                    <SessionCard
                        key={session.id}
                        session={session}
                        showHost={false}
                        onPress={() => navigation.push('SessionDetails', { id: session.id })}
                    />
                ))}
                {hosting.length === 0 && <Text style={styles.muted}>Not hosting anything right now.</Text>}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    content: {
        gap: 24,
        paddingTop: 28,
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    identity: {
        alignItems: 'center',
        gap: 14,
    },
    names: {
        alignItems: 'center',
        gap: 4,
    },
    username: {
        fontSize: 22,
        color: colors.text,
        fontFamily: fonts.extrabold,
    },
    muted: {
        fontSize: 14,
        color: colors.muted,
        fontFamily: fonts.regular,
    },
    section: {
        gap: 10,
    },
});
