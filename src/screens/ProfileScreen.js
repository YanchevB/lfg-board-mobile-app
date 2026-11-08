import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import AppButton from '../components/AppButton';
import Avatar from '../components/Avatar';
import AvatarSheet from '../components/AvatarSheet';
import Icon from '../components/Icon';
import LargeHeader from '../components/LargeHeader';
import { currentUser, getHostedSessions, getJoinedSessions } from '../data/sampleData';
import { colors, fonts } from '../theme';
import { memberSince } from '../utils/time';

export default function ProfileScreen({ navigation }) {
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const hostingCount = getHostedSessions(currentUser.id).length;
    const joinedCount = getJoinedSessions(currentUser.id).length;

    function openMySessions() {
        navigation.navigate('MySessionsTab');
    }

    return (
        <View style={styles.screen}>
            <LargeHeader title="Profile" paddingBottom={8} />

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.identity}>
                    <View style={styles.avatarWrap}>
                        <Avatar name={currentUser.username} size={112} fontSize={44} highlighted />
                        <Pressable
                            accessibilityRole="button"
                            accessibilityLabel="Change profile picture"
                            onPress={() => setIsSheetOpen(true)}
                            style={styles.cameraButton}
                        >
                            <Icon name="camera" size={20} color={colors.text} />
                        </Pressable>
                    </View>
                    <View style={styles.names}>
                        <Text style={styles.username}>{currentUser.username}</Text>
                        <Text style={styles.since}>Member since {memberSince(currentUser.created_at)}</Text>
                    </View>
                </View>

                <View style={styles.stats}>
                    <Stat value={hostingCount} label="Hosting" onPress={openMySessions} />
                    <Stat value={joinedCount} label="Joined" onPress={openMySessions} />
                </View>

                <View style={styles.list}>
                    <Pressable
                        accessibilityRole="button"
                        onPress={() => setIsSheetOpen(true)}
                        style={[styles.listRow, styles.divider]}
                    >
                        <Icon name="image" size={20} color={colors.muted} />
                        <Text style={styles.listLabel}>Change profile picture</Text>
                        <Icon name="chevronRight" size={18} color={colors.muted} />
                    </Pressable>
                    <View style={styles.listRow}>
                        <Icon name="mail" size={20} color={colors.muted} />
                        <Text style={styles.listLabel}>Email</Text>
                        <Text style={styles.listValue} numberOfLines={1}>{currentUser.email}</Text>
                    </View>
                </View>

                <View style={styles.spacer} />

                {/* Logging out comes with AuthContext (Thu Nov 12) */}
                <AppButton title="Log out" icon="logout" variant="danger" />
            </ScrollView>

            <AvatarSheet visible={isSheetOpen} onClose={() => setIsSheetOpen(false)} />
        </View>
    );
}

function Stat({ value, label, onPress }) {
    return (
        <Pressable accessibilityRole="button" onPress={onPress} style={styles.stat}>
            <Text style={styles.statValue}>{value}</Text>
            <Text style={styles.statLabel}>{label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    content: {
        flexGrow: 1,
        gap: 24,
        padding: 16,
    },
    identity: {
        alignItems: 'center',
        gap: 14,
    },
    avatarWrap: {
        width: 112,
        height: 112,
    },
    cameraButton: {
        position: 'absolute',
        right: -2,
        bottom: -2,
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 22,
        borderWidth: 3,
        borderColor: colors.background,
        backgroundColor: colors.surfaceRaised,
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
    since: {
        fontSize: 14,
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
        paddingVertical: 14,
        paddingHorizontal: 16,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 12,
    },
    statValue: {
        fontSize: 24,
        color: colors.text,
        fontFamily: fonts.extrabold,
    },
    statLabel: {
        fontSize: 13,
        color: colors.muted,
        fontFamily: fonts.regular,
    },
    list: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 14,
        overflow: 'hidden',
    },
    listRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        minHeight: 56,
        paddingHorizontal: 16,
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    listLabel: {
        flex: 1,
        fontSize: 15,
        color: colors.text,
        fontFamily: fonts.semibold,
    },
    listValue: {
        flexShrink: 1,
        fontSize: 14,
        color: colors.muted,
        fontFamily: fonts.regular,
    },
    spacer: {
        flex: 1,
    },
});
