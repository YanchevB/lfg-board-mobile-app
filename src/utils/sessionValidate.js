const MAX_GAME_LENGTH = 50;

// joinedCount: players already in the session (0 when creating), slots can't go below it
export default function sessionValidate(formData, joinedCount = 0) {
    const errors = {};
    const game = formData.game.trim();

    if (!game) {
        errors.game = 'Game is required';
    } else if (game.length > MAX_GAME_LENGTH) {
        errors.game = `Game must be at most ${MAX_GAME_LENGTH} characters`;
    }

    if (!formData.platform) errors.platform = 'Platform is required';

    if (!Number.isInteger(formData.slots) || formData.slots < 2 || formData.slots > 8) {
        errors.slots = 'Slots must be between 2 and 8';
    } else if (formData.slots < joinedCount) {
        errors.slots = `Slots can't be lower than the ${joinedCount} players who joined`;
    }

    return errors;
}
