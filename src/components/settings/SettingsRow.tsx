import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { AppText } from '@/components/ui';
import { colors } from '@/constants/colors';
import { radius } from '@/constants/radius';
import { spacing } from '@/constants/spacing';

type Props = {
  icon: ComponentProps<typeof Ionicons>['name'];
  title: string;
  description: string;
  onPress?: () => void;
  trailingLabel?: string;
  active?: boolean;
};

export function SettingsRow({ icon, title, description, onPress, trailingLabel, active }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      <View style={styles.icon}><Ionicons name={icon} size={22} color={colors.text} /></View>
      <View style={styles.copy}>
        <AppText variant="label">{title}</AppText>
        <AppText variant="caption" color={colors.textSecondary}>{description}</AppText>
      </View>
      {trailingLabel ? <AppText variant="caption" color={colors.textSecondary}>{trailingLabel}</AppText> : null}
      {typeof active === 'boolean' ? (
        <View style={[styles.switch, active && styles.switchActive]} accessibilityLabel={active ? 'Ativado' : 'Desativado'}>
          <View style={[styles.knob, active && styles.knobActive]} />
        </View>
      ) : onPress ? <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { width: '100%', minHeight: 82, flexDirection: 'row', alignItems: 'center', gap: spacing[3], padding: spacing[4], borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, backgroundColor: colors.surface },
  icon: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center', borderRadius: radius.full, backgroundColor: colors.neutral[100] },
  copy: { flex: 1, minWidth: 0, gap: spacing[1] },
  switch: { width: 46, height: 28, padding: 3, justifyContent: 'center', borderRadius: radius.full, backgroundColor: colors.neutral[300] },
  switchActive: { backgroundColor: colors.brand.coral },
  knob: { width: 22, height: 22, borderRadius: radius.full, backgroundColor: colors.surface },
  knobActive: { alignSelf: 'flex-end' },
  pressed: { opacity: 0.72 },
});
