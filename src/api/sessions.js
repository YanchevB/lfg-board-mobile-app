import supabase from '../lib/supabase';

// Every session comes with its host and its players, so all screens get the same shape
const SESSION_SELECT = '*, host:profiles!owner_id(id, username), session_players(joined_at, player:profiles!user_id(id, username))';

// Postgres error for a malformed uuid: treat it the same as "not found"
const INVALID_ID = '22P02';

function toSession(row) {
    const { session_players, ...session } = row;

    return { ...session, players: session_players.map((entry) => entry.player) };
}

function sessionsQuery(select = SESSION_SELECT) {
    return supabase
        .from('sessions')
        .select(select)
        .order('created_at', { ascending: false })
        .order('joined_at', { referencedTable: 'session_players' });
}

async function unwrapList(query) {
    const { data, error } = await query;

    if (error) throw error;

    return data.map(toSession);
}

export function getOpenSessions() {
    return unwrapList(sessionsQuery().eq('is_closed', false));
}

export function getHostedSessions(userId) {
    return unwrapList(sessionsQuery().eq('owner_id', userId));
}

export function getJoinedSessions(userId) {
    return unwrapList(
        sessionsQuery(`${SESSION_SELECT}, me:session_players!inner(user_id)`)
            .eq('me.user_id', userId)
            .neq('owner_id', userId),
    );
}

export async function getSession(id) {
    const { data, error } = await sessionsQuery().eq('id', id).maybeSingle();

    if (error?.code === INVALID_ID) return null;
    if (error) throw error;

    return data && toSession(data);
}
