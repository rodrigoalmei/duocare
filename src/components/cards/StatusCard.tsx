import type { ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { colors } from '@/constants/colors';
import { radius } from '@/constants/radius';
import { spacing } from '@/constants/spacing';

import { AppText } from '../ui';

type StatusCardProps = {
  icon: ComponentProps<typeof Ionicons>['name'];
  title: string;
  description: string;
  tone?: 'info' | 'warning' | 'neutral';
};

export function StatusCard({ icon, title, description, tone = 'neutral' }: StatusCardProps) {
  const backgroundColor = tone === 'info' ? colors.status.infoSurface : tone === 'warning' ? colors.status.warningSurface : colors.neutral[100];
  return (
    <View style={[styles.card, { backgroundColor }]}>
      <View style={styles.iconCircle}>
        <Ionicons name={icon} size={20} color={colors.text} />
      </View>
      <View style={styles.copy}>
        <AppText variant="label">{title}</AppText>
        <AppText variant="caption" color={colors.textSecondary}>
          {description}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { width: '100%', flexDirection: 'row', alignItems: 'center', gap: spacing[3], padding: spacing[4], borderRadius: radius.lg },
  iconCircle: { width: 40, height: 40, borderRadius: radius.full, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  copy: { flex: 1, gap: spacing[1] },
});
