import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';

import AppButton from '../components/AppButton';
import Icon from '../components/Icon';
import LargeHeader from '../components/LargeHeader';
import SessionCard from '../components/SessionCard';
import { fetchOpenSessions } from '../data/sampleData';
import { colors, fonts } from '../theme';

export default function CatalogScreen({ navigation }) {
    const [sessions, setSessions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [hasError, setHasError] = useState(false);

    const loadSessions = useCallback(() => {
        return fetchOpenSessions()
            .then((data) => {
                setSessions(data);
                setHasError(false);
            })
            .catch(() => setHasError(true));
    }, []);

    useEffect(() => {
        loadSessions().finally(() => setIsLoading(false));
    }, [loadSessions]);

    async function refresh() {
        setIsRefreshing(true);
        await loadSessions();
        setIsRefreshing(false);
    }

    async function retry() {
        setIsLoading(true);
        await loadSessions();
        setIsLoading(false);
    }

    const refreshControl = (
        <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refresh}
            tintColor={colors.accent}
            colors={[colors.accent]}
            progressBackgroundColor={colors.surface}
        />
    );

    function renderContent() {
        if (isLoading) {
            return <CatalogLoading />;
        }

        if (hasError) {
            return <CatalogError refreshControl={refreshControl} onRetry={retry} />;
        }

        return (
            <FlatList
                data={sessions}
                keyExtractor={(session) => session.id}
                renderItem={({ item }) => (
                    <SessionCard session={item} onPress={() => navigation.navigate('SessionDetails', { id: item.id })} />
                )}
                ItemSeparatorComponent={Separator}
                contentContainerStyle={styles.list}
                refreshControl={refreshControl}
            />
        );
    }

    return (
        <View style={styles.screen}>
            <LargeHeader
                eyebrow="LFG Board"
                title="Sessions"
                right={
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Host a session"
                        onPress={() => navigation.navigate('CreateSession')}
                        style={styles.host}
                    >
                        <Icon name="plus" size={18} color={colors.onAccent} strokeWidth={2.5} />
                        <Text style={styles.hostLabel}>Host</Text>
                    </Pressable>
                }
            />
            {renderContent()}
        </View>
    );
}

function Separator() {
    return <View style={styles.separator} />;
}

function CatalogLoading() {
    return (
        <View>
            <View style={styles.loadingRow}>
                <ActivityIndicator color={colors.accent} />
                <Text style={styles.loadingText}>Refreshing sessions…</Text>
            </View>

            <View style={styles.skeletons}>
                <SkeletonCard titleWidth={150} metaWidth={60} lineWidth="70%" />
                <SkeletonCard titleWidth={120} metaWidth={80} lineWidth="55%" opacity={0.75} />
                <SkeletonCard titleWidth={170} metaWidth={50} lineWidth="65%" opacity={0.5} hideFooter />
            </View>
        </View>
    );
}

function SkeletonCard({ titleWidth, metaWidth, lineWidth, opacity = 1, hideFooter = false }) {
    return (
        <View style={[styles.skeleton, { opacity }]}>
            <View style={styles.bonesRow}>
                <Bone width={titleWidth} height={18} />
                <Bone width={52} height={22} radius={11} />
            </View>
            <Bone width={metaWidth} height={12} />
            <Bone width="100%" height={12} />
            <Bone width={lineWidth} height={12} />
            {!hideFooter && (
                <View style={styles.bonesRow}>
                    <Bone width={90} height={14} />
                    <Bone width={80} height={14} />
                </View>
            )}
        </View>
    );
}

function Bone({ width, height, radius = 6 }) {
    return <View style={{ width, height, borderRadius: radius, backgroundColor: colors.surfaceRaised }} />;
}

function CatalogError({ refreshControl, onRetry }) {
    return (
        <ScrollView contentContainerStyle={styles.error} refreshControl={refreshControl}>
            <View style={styles.errorIcon}>
                <Icon name="wifiOff" size={30} color={colors.dangerText} />
            </View>
            <View style={styles.errorText}>
                <Text style={styles.errorTitle}>Couldn&apos;t load sessions</Text>
                <Text style={styles.errorMessage}>Check your connection and try again. You can also pull down to refresh.</Text>
            </View>
            <AppButton title="Try again" icon="refresh" variant="outline" size="md" onPress={onRetry} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    host: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        height: 44,
        paddingHorizontal: 16,
        borderRadius: 999,
        backgroundColor: colors.accent,
    },
    hostLabel: {
        fontSize: 15,
        color: colors.onAccent,
        fontFamily: fonts.bold,
    },
    list: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    separator: {
        height: 12,
    },
    loadingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        height: 56,
    },
    loadingText: {
        fontSize: 13,
        color: colors.muted,
        fontFamily: fonts.semibold,
    },
    skeletons: {
        gap: 12,
        paddingHorizontal: 16,
    },
    skeleton: {
        gap: 14,
        padding: 16,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 14,
    },
    bonesRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    error: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        paddingHorizontal: 40,
        paddingBottom: 60,
    },
    errorIcon: {
        width: 64,
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 32,
        backgroundColor: colors.dangerSoft,
    },
    errorText: {
        gap: 8,
    },
    errorTitle: {
        textAlign: 'center',
        fontSize: 20,
        color: colors.text,
        fontFamily: fonts.bold,
    },
    errorMessage: {
        textAlign: 'center',
        fontSize: 15,
        lineHeight: 22,
        color: colors.muted,
        fontFamily: fonts.regular,
    },
});
