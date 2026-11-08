import { useState } from 'react';
import { KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AppButton from './AppButton';
import { HEADER_BAR_HEIGHT } from './AppHeader';
import FieldError from './FieldError';
import FormField from './FormField';
import Icon from './Icon';
import { colors, fonts } from '../theme';

const PLATFORMS = ['PC', 'PS5', 'Xbox', 'Switch', 'Cross-platform'];
const MIN_SLOTS = 2;
const MAX_SLOTS = 8;

export default function SessionForm({ initialValues, joinedCount = 0, submitLabel, onSubmit }) {
    const insets = useSafeAreaInsets();

    const [game, setGame] = useState(initialValues.game);
    const [platform, setPlatform] = useState(initialValues.platform);
    const [slots, setSlots] = useState(initialValues.slots);
    const [micRequired, setMicRequired] = useState(initialValues.mic_required);
    const [description, setDescription] = useState(initialValues.description);
    const [gameError, setGameError] = useState('');

    const slotsTooLow = slots < joinedCount;

    function changeGame(value) {
        setGame(value);
        setGameError('');
    }

    function submit() {
        if (!game.trim()) {
            setGameError('Game is required');
            return;
        }

        if (slotsTooLow) {
            return;
        }

        onSubmit({ game: game.trim(), platform, slots, mic_required: micRequired, description: description.trim() });
    }

    return (
        <KeyboardAvoidingView
            style={styles.screen}
            behavior="padding"
            keyboardVerticalOffset={insets.top + HEADER_BAR_HEIGHT}
        >
            <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
                <FormField
                    label="Game"
                    placeholder="e.g. Rocket League"
                    value={game}
                    onChangeText={changeGame}
                    error={gameError}
                />

                <View style={styles.group}>
                    <Text style={styles.label}>Platform</Text>
                    <View style={styles.chips}>
                        {PLATFORMS.map((option) => (
                            <PlatformChip
                                key={option}
                                label={option}
                                selected={option === platform}
                                onPress={() => setPlatform(option)}
                            />
                        ))}
                    </View>
                </View>

                <View style={styles.field}>
                    <View style={[styles.panel, slotsTooLow && styles.panelError]}>
                        <View style={styles.panelText}>
                            <Text style={styles.panelTitle}>Open slots</Text>
                            <Text style={styles.panelHint}>
                                {joinedCount > 0
                                    ? `${joinedCount} ${joinedCount === 1 ? 'player' : 'players'} already joined`
                                    : '2–8 players, you included'}
                            </Text>
                        </View>

                        <View style={styles.stepper}>
                            <StepButton
                                icon="minus"
                                label="Fewer slots"
                                disabled={slots <= MIN_SLOTS}
                                onPress={() => setSlots(slots - 1)}
                            />
                            <Text style={[styles.stepValue, slotsTooLow && styles.stepValueError]}>{slots}</Text>
                            <StepButton
                                icon="plus"
                                label="More slots"
                                disabled={slots >= MAX_SLOTS}
                                onPress={() => setSlots(slots + 1)}
                            />
                        </View>
                    </View>

                    {slotsTooLow && <FieldError message={`Slots can't be lower than the ${joinedCount} players who joined`} />}
                </View>

                <View style={styles.panel}>
                    <View style={styles.panelText}>
                        <Text style={styles.panelTitle}>Mic required</Text>
                        <Text style={styles.panelHint}>Players must be able to talk</Text>
                    </View>
                    <Switch
                        value={micRequired}
                        onValueChange={setMicRequired}
                        trackColor={{ false: colors.border, true: colors.accent }}
                        thumbColor="#ffffff"
                        ios_backgroundColor={colors.border}
                    />
                </View>

                <FormField
                    label="Description"
                    hint="(optional)"
                    placeholder="Rank, mode, where you'll meet up…"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                />
            </ScrollView>

            <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 12) }]}>
                <AppButton title={submitLabel} onPress={submit} />
            </View>
        </KeyboardAvoidingView>
    );
}

function PlatformChip({ label, selected, onPress }) {
    return (
        <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected }}
            onPress={onPress}
            style={[styles.chip, selected && styles.chipSelected]}
        >
            {selected && <Icon name="check" size={14} color={colors.accentLight} strokeWidth={3} />}
            <Text style={[styles.chipLabel, selected && styles.chipLabelSelected]}>{label}</Text>
        </Pressable>
    );
}

function StepButton({ icon, label, disabled, onPress }) {
    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={label}
            disabled={disabled}
            onPress={onPress}
            style={[styles.stepButton, disabled && styles.stepButtonDisabled]}
        >
            <Icon name={icon} size={18} color={colors.text} strokeWidth={2.5} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    content: {
        gap: 20,
        paddingVertical: 20,
        paddingHorizontal: 16,
    },
    field: {
        gap: 6,
    },
    group: {
        gap: 8,
    },
    label: {
        fontSize: 14,
        color: colors.text,
        fontFamily: fonts.semibold,
    },
    chips: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        height: 44,
        paddingHorizontal: 16,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
    },
    chipSelected: {
        borderColor: colors.accent,
        backgroundColor: colors.accentSelected,
    },
    chipLabel: {
        fontSize: 14,
        color: colors.muted,
        fontFamily: fonts.semibold,
    },
    chipLabelSelected: {
        color: colors.text,
        fontFamily: fonts.bold,
    },
    panel: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        paddingVertical: 14,
        paddingHorizontal: 16,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 12,
    },
    panelError: {
        backgroundColor: colors.dangerTint,
        borderColor: colors.danger,
    },
    panelText: {
        flex: 1,
        gap: 2,
    },
    panelTitle: {
        fontSize: 15,
        color: colors.text,
        fontFamily: fonts.semibold,
    },
    panelHint: {
        fontSize: 13,
        color: colors.muted,
        fontFamily: fonts.regular,
    },
    stepper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    stepButton: {
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surfaceRaised,
    },
    stepButtonDisabled: {
        opacity: 0.4,
    },
    stepValue: {
        width: 40,
        textAlign: 'center',
        fontSize: 20,
        color: colors.text,
        fontFamily: fonts.extrabold,
    },
    stepValueError: {
        color: colors.dangerText,
    },
    footer: {
        paddingTop: 12,
        paddingHorizontal: 16,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
});
