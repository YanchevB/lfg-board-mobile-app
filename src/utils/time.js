const UNITS = [
    ['y', 60 * 60 * 24 * 365],
    ['mo', 60 * 60 * 24 * 30],
    ['d', 60 * 60 * 24],
    ['h', 60 * 60],
    ['m', 60],
];

export function timeAgo(timestamp) {
    const secondsAgo = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000);

    for (const [unit, secondsInUnit] of UNITS) {
        if (secondsAgo >= secondsInUnit) {
            return `${Math.floor(secondsAgo / secondsInUnit)}${unit} ago`;
        }
    }

    return 'just now';
}

export function memberSince(timestamp) {
    return new Date(timestamp).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}
