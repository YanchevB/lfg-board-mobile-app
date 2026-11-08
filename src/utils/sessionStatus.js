export function getSessionStatus(session, playerCount) {
    if (session.is_closed) return 'closed';
    if (playerCount >= session.slots) return 'full';

    return 'open';
}
