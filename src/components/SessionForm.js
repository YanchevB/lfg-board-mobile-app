import { KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AppButton from './AppButton';
import { HEADER_BAR_HEIGHT } from './AppHeader';
import FieldError from './FieldError';
import FormField from './FormField';
import Icon from './Icon';
import useForm from '../hooks/useForm';
import { colors, fonts } from '../theme';
import sessionValidate from '../utils/sessionValidate';

const PLATFORMS = ['PC', 'PS5', 'Xbox', 'Switch', 'Cross-platform'];
const MIN_SLOTS = 2;
const MAX_SLOTS = 8;

export default function SessionForm({ initialValues, joinedCount = 0, submitLabel, submittingLabel, onSubmit }) {
    const insets = useSafeAreaInsets();

    const { formData, fieldError, error, isSubmitting, changeHandler, submitHandler } = useForm(
        initialValues,
        (values) => sessionValidate(values, joinedCount),
        onSubmit,
    );

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
                    value={formData.game}
                    onChangeText={(text) => changeHandler('game', text)}
                    error={fieldError.game}
                />

                <View style={styles.group}>
                    <Text style={styles.label}>Platform</Text>
                    <View style={styles.chips}>
                        {PLATFORMS.map((option) => (
                            <PlatformChip
                                key={option}
                                label={option}
                                selected={option === formData.platform}
                                onPress={() => changeHandler('platform', option)}
                            />
                        ))}
                    </View>
                    {fieldError.platform && <FieldError message={fieldError.platform} />}
                </View>

                <View style={styles.field}>
                    <View style={[styles.panel, fieldError.slots && styles.panelError]}>
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
                                disabled={formData.slots <= MIN_SLOTS}
                                onPress={() => changeHandler('slots', formData.slots - 1)}
                            />
                            <Text style={[styles.stepValue, fieldError.slots && styles.stepValueError]}>{formData.slots}</Text>
                            <StepButton
                                icon="plus"
                                label="More slots"
                                disabled={formData.slots >= MAX_SLOTS}
                                onPress={() => changeHandler('slots', formData.slots + 1)}
                            />
                        </View>
                    </View>

                    {fieldError.slots && <FieldError message={fieldError.slots} />}
                </View>

                <View style={styles.panel}>
                    <View style={styles.panelText}>
                        <Text style={styles.panelTitle}>Mic required</Text>
                        <Text style={styles.panelHint}>Players must be able to talk</Text>
                    </View>
                    <Switch
                        value={formData.mic_required}
                        onValueChange={(value) => changeHandler('mic_required', value)}
                        trackColor={{ false: colors.border, true: colors.accent }}
                        thumbColor="#ffffff"
                        ios_backgroundColor={colors.border}
                    />
                </View>

                <FormField
                    label="Description"
                    hint="(optional)"
                    placeholder="Rank, mode, where you'll meet up…"
                    value={formData.description}
                    onChangeText={(text) => changeHandler('description', text)}
                    multiline
                />
            </ScrollView>

            <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 12) }]}>
                {error && <FieldError message={error} />}
                <AppButton
                    title={isSubmitting ? submittingLabel : submitLabel}
                    onPress={submitHandler}
                    disabled={isSubmitting}
                />
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
        gap: 12,
        paddingTop: 12,
        paddingHorizontal: 16,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
});
