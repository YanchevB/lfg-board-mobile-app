// Temporary sample data so the screens can be seen before Supabase is connected.
// The exam fails hardcoded data: delete this file once the real queries exist.

// Set to true to see the Catalog error state.
const SIMULATE_LOAD_ERROR = false;

const hoursAgo = (hours) => new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();

const profiles = {
    me: { id: 'me', username: 'YanchevB', email: 'boyan@example.com', created_at: '2026-10-08T12:00:00Z' },
    mgk: { id: 'mgk', username: 'MGK', created_at: '2026-10-09T12:00:00Z' },
    krum: { id: 'krum', username: 'Krum4o', created_at: '2026-10-10T12:00:00Z' },
    banana: { id: 'banana', username: 'bananaman', created_at: '2026-10-11T12:00:00Z' },
    dark: { id: 'dark', username: '_DarkKnight_', created_at: '2026-10-12T12:00:00Z' },
    captain: { id: 'captain', username: 'CaptainFailer', created_at: '2026-10-13T12:00:00Z' },
};

const sessions = [
    {
        id: '1',
        owner_id: 'mgk',
        game: 'Battlefield 6',
        platform: 'PC',
        slots: 3,
        mic_required: false,
        description: "Just a relaxing few matches that's all, no need to even talk",
        is_closed: false,
        created_at: hoursAgo(1),
        playerIds: ['mgk'],
    },
    {
        id: '2',
        owner_id: 'krum',
        game: 'Minecraft',
        platform: 'PC',
        slots: 7,
        mic_required: true,
        description: 'Looking for chill minecraft players to build with',
        is_closed: false,
        created_at: hoursAgo(1.5),
        playerIds: ['krum', 'me'],
    },
    {
        id: '3',
        owner_id: 'banana',
        game: 'GTA Online',
        platform: 'Cross-platform',
        slots: 2,
        mic_required: true,
        description: "Last few weeks to farm some money and do some heists before GTA 6 comes out, let's goooooo!",
        is_closed: false,
        created_at: hoursAgo(1.8),
        playerIds: ['banana', 'mgk'],
    },
    {
        id: '4',
        owner_id: 'dark',
        game: 'Valorant',
        platform: 'PS5',
        slots: 5,
        mic_required: true,
        description: 'Need 4 more people for a Ranked game, currently Gold 1',
        is_closed: false,
        created_at: hoursAgo(2),
        playerIds: ['dark', 'captain'],
    },
    {
        id: '5',
        owner_id: 'me',
        game: 'Helldivers 2',
        platform: 'PC',
        slots: 4,
        mic_required: true,
        description: 'Difficulty 7+ ops tonight. Bring your favourite stratagems.',
        is_closed: false,
        created_at: hoursAgo(3),
        playerIds: ['me', 'mgk', 'banana'],
    },
    {
        id: '6',
        owner_id: 'captain',
        game: 'World of Warcraft',
        platform: 'PC',
        slots: 2,
        mic_required: true,
        description: 'Mythic+ keys, closed for tonight.',
        is_closed: true,
        created_at: hoursAgo(26),
        playerIds: ['captain', 'me'],
    },
];

function withPlayers(session) {
    return {
        ...session,
        players: session.playerIds.map((id) => profiles[id]),
        host: profiles[session.owner_id],
    };
}

export const currentUser = profiles.me;

export function getProfile(id) {
    return profiles[id];
}

export function getSession(id) {
    const session = sessions.find((item) => item.id === id);

    return session ? withPlayers(session) : undefined;
}

export function getHostedSessions(userId) {
    return sessions.filter((session) => session.owner_id === userId).map(withPlayers);
}

export function getJoinedSessions(userId) {
    return sessions
        .filter((session) => session.owner_id !== userId && session.playerIds.includes(userId))
        .map(withPlayers);
}

export function fetchOpenSessions() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (SIMULATE_LOAD_ERROR) {
                reject(new Error('Network request failed'));
                return;
            }

            resolve(sessions.filter((session) => !session.is_closed).map(withPlayers));
        }, 800);
    });
}
