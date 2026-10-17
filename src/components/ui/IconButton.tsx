import type { ComponentProps } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { colors } from '@/constants/colors';
import { layout } from '@/constants/layout';
import { radius } from '@/constants/radius';

type IconButtonProps = {
  icon: ComponentProps<typeof Ionicons>['name'];
  label: string;
  onPress?: () => void;
  backgroundColor?: string;
};

export function IconButton({ icon, label, onPress, backgroundColor = colors.brand.lightPink }: IconButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.button, { backgroundColor }, pressed && styles.pressed]}>
      <Ionicons name={icon} size={22} color={colors.text} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: layout.minTouchTarget,
    height: layout.minTouchTarget,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.72 },
});
