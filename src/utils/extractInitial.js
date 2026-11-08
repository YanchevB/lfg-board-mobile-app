export function extractInitial(str) {
    const firstLetter = str?.match(/\p{L}/u);

    return firstLetter ? firstLetter[0].toUpperCase() : '?';
}
