import { useState, type ComponentProps } from 'react';
import { ActivityIndicator, Animated, Platform, Pressable, StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { colors } from '@/constants/colors';
import { layout } from '@/constants/layout';
import { radius } from '@/constants/radius';
import { spacing } from '@/constants/spacing';
import { useReducedMotion } from '@/hooks/useReducedMotion';

import { AppText } from './AppText';

type IconName = ComponentProps<typeof Ionicons>['name'];
type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = {
  label: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  icon?: IconName;
  accessibilityHint?: string;
  variant?: ButtonVariant;
  testID?: string;
};

export function AppButton({
  label,
  onPress,
  loading = false,
  disabled = false,
  icon,
  accessibilityHint,
  variant = 'primary',
  testID,
}: ButtonProps) {
  const [scale] = useState(() => new Animated.Value(1));
  const reduceMotion = useReducedMotion();
  const inactive = disabled || loading;
  const foreground = colors.text;

  const animate = (toValue: number) => {
    if (reduceMotion) return;
    Animated.timing(scale, { toValue, duration: 120, useNativeDriver: Platform.OS !== 'web' }).start();
  };

  return (
    <Animated.View style={[styles.fullWidth, { transform: [{ scale }] }]}>
      <Pressable
        testID={testID}
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityHint={accessibilityHint}
        accessibilityState={{ disabled: inactive, busy: loading }}
        disabled={inactive}
        onPress={onPress}
        onPressIn={() => animate(0.98)}
        onPressOut={() => animate(1)}
        style={({ pressed }) => [
          styles.button,
          variant === 'primary' ? styles.primary : styles.secondary,
          inactive && styles.disabled,
          pressed && reduceMotion && styles.pressed,
        ]}>
        {loading ? (
          <ActivityIndicator color={foreground} accessibilityLabel="Carregando" />
        ) : (
          <View style={styles.labelRow}>
            {icon ? <Ionicons name={icon} size={20} color={foreground} /> : null}
            <AppText variant="label" color={foreground}>
              {label}
            </AppText>
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}

export function PrimaryButton(props: Omit<ButtonProps, 'variant'>) {
  return <AppButton {...props} variant="primary" />;
}

export function SecondaryButton(props: Omit<ButtonProps, 'variant'>) {
  return <AppButton {...props} variant="secondary" />;
}

export function TextButton({
  label,
  onPress,
  icon,
  accessibilityHint,
}: Pick<ButtonProps, 'label' | 'onPress' | 'icon' | 'accessibilityHint'>) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      onPress={onPress}
      hitSlop={8}
      style={({ pressed }) => [styles.textButton, pressed && styles.pressed]}>
      {icon ? <Ionicons name={icon} size={18} color={colors.brand.coral} /> : null}
      <AppText variant="label" color={colors.brand.coral}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fullWidth: { width: '100%' },
  button: {
    width: '100%',
    minHeight: 52,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing[4],
    borderWidth: 1,
  },
  primary: { backgroundColor: colors.brand.coral, borderColor: colors.brand.coral },
  secondary: { backgroundColor: colors.surface, borderColor: colors.brand.coral },
  disabled: { opacity: 0.45 },
  pressed: { opacity: 0.78 },
  labelRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing[2] },
  textButton: {
    minHeight: layout.minTouchTarget,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2],
    paddingHorizontal: spacing[2],
  },
});
