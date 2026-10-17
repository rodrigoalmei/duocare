import type { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors } from '@/constants/colors';
import { radius } from '@/constants/radius';
import { spacing } from '@/constants/spacing';

type CardProps = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  accessibilityLabel?: string;
}>;

export function Card({ children, style, onPress, accessibilityLabel }: CardProps) {
  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        onPress={onPress}
        style={({ pressed }) => [styles.card, style, pressed && styles.pressed]}>
        {children}
      </Pressable>
    );
  }

  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: radius.lg,
    padding: spacing[4],
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: { opacity: 0.76, transform: [{ scale: 0.99 }] },
});
