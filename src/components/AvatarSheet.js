import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AppButton from './AppButton';
import Icon from './Icon';
import { colors, fonts } from '../theme';

export default function AvatarSheet({ visible, onClose }) {
    const insets = useSafeAreaInsets();

    return (
        <Modal visible={visible} transparent animationType="fade" statusBarTranslucent onRequestClose={onClose}>
            <Pressable accessibilityLabel="Close" style={styles.overlay} onPress={onClose} />

            <View style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, 16) }]}>
                <View style={styles.handle} />

                <View style={styles.intro}>
                    <Text style={styles.title}>Profile picture</Text>
                    <Text style={styles.text}>Shown on your profile and in every session&apos;s player list.</Text>
                </View>

                {/* The three options only close the sheet until ImagePicker is added (Sat Nov 28) */}
                <SheetOption icon="camera" label="Take photo" onPress={onClose} />
                <SheetOption icon="image" label="Choose from library" onPress={onClose} />
                <SheetOption icon="trash" label="Remove photo" onPress={onClose} danger />

                <AppButton title="Cancel" variant="outline" onPress={onClose} style={styles.cancel} />
            </View>
        </Modal>
    );
}

function SheetOption({ icon, label, onPress, danger = false }) {
    return (
        <Pressable accessibilityRole="button" onPress={onPress} style={[styles.option, danger && styles.optionDanger]}>
            <View style={[styles.optionIcon, danger && styles.optionIconDanger]}>
                <Icon name={icon} size={20} color={danger ? colors.dangerText : colors.accentLight} />
            </View>
            <Text style={[styles.optionLabel, danger && styles.optionLabelDanger]}>{label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: colors.overlay,
    },
    sheet: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        gap: 8,
        paddingTop: 10,
        paddingHorizontal: 16,
        backgroundColor: colors.surface,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        borderTopLeftRadius: 22,
        borderTopRightRadius: 22,
    },
    handle: {
        alignSelf: 'center',
        width: 40,
        height: 5,
        borderRadius: 3,
        backgroundColor: colors.border,
    },
    intro: {
        gap: 4,
        paddingTop: 12,
        paddingBottom: 8,
        paddingHorizontal: 4,
    },
    title: {
        fontSize: 20,
        color: colors.text,
        fontFamily: fonts.extrabold,
    },
    text: {
        fontSize: 14,
        lineHeight: 21,
        color: colors.muted,
        fontFamily: fonts.regular,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        minHeight: 60,
        paddingHorizontal: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surfaceRaised,
    },
    optionDanger: {
        borderWidth: 0,
        backgroundColor: 'transparent',
    },
    optionIcon: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: colors.accentSoft,
    },
    optionIconDanger: {
        backgroundColor: colors.dangerSoft,
    },
    optionLabel: {
        fontSize: 16,
        color: colors.text,
        fontFamily: fonts.semibold,
    },
    optionLabelDanger: {
        color: colors.dangerText,
    },
    cancel: {
        marginTop: 6,
    },
});
