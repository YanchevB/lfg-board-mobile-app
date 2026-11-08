import { ScrollView, StyleSheet, Text, View } from 'react-native';

import Avatar from '../components/Avatar';
import SectionLabel from '../components/SectionLabel';
import SessionCard from '../components/SessionCard';
import { getHostedSessions, getProfile } from '../data/sampleData';
import { colors, fonts } from '../theme';
import { memberSince } from '../utils/time';

export default function PlayerProfileScreen({ navigation, route }) {
    const { id } = route.params;
    const player = getProfile(id);

    if (!player) {
        return (
            <View style={styles.notFound}>
                <Text style={styles.muted}>This player doesn&apos;t exist anymore.</Text>
            </View>
        );
    }

    const hosting = getHostedSessions(id);

    return (
        <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.identity}>
                <Avatar name={player.username} size={104} fontSize={40} bordered />
                <View style={styles.names}>
                    <Text style={styles.username}>{player.username}</Text>
                    <Text style={styles.muted}>Member since {memberSince(player.created_at)}</Text>
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
    notFound: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
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
