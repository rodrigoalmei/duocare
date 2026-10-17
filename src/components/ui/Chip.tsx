import { Pressable, StyleSheet } from 'react-native';

import { colors } from '@/constants/colors';
import { radius } from '@/constants/radius';
import { spacing } from '@/constants/spacing';

import { AppText } from './AppText';

type ChipProps = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  disabled?: boolean;
};

export function Chip({ label, selected = false, onPress, disabled = false }: ChipProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected, disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        selected && styles.selected,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}>
      <AppText variant="caption" color={selected ? colors.text : colors.textSecondary}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    minHeight: 36,
    paddingHorizontal: spacing[3],
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: { backgroundColor: colors.brand.coral, borderColor: colors.brand.coral },
  pressed: { opacity: 0.72 },
  disabled: { opacity: 0.45 },
});
