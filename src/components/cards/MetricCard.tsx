import type { ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { colors } from '@/constants/colors';
import { radius } from '@/constants/radius';
import { spacing } from '@/constants/spacing';
import type { HealthMetric } from '@/types';

import { AppText } from '../ui';

const toneColor = {
  mother: colors.brand.lightPink,
  baby: colors.brand.babyCream,
  info: colors.brand.contrastBlue,
  neutral: colors.neutral[100],
};

export function MetricCard({ metric }: { metric: HealthMetric }) {
  const icon = metric.icon as ComponentProps<typeof Ionicons>['name'];
  return (
    <View style={[styles.card, { backgroundColor: toneColor[metric.tone] }]} accessibilityLabel={`${metric.label}: ${metric.value}`}>
      <View style={styles.titleRow}>
        <Ionicons name={icon} size={16} color={colors.text} />
        <AppText variant="caption" color={colors.textSecondary}>
          {metric.label}
        </AppText>
      </View>
      <AppText variant="h3">{metric.value}</AppText>
      <AppText variant="caption" color={colors.textSecondary}>
        {metric.period}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexGrow: 1, minWidth: 96, minHeight: 88, borderRadius: radius.lg, padding: spacing[3], gap: spacing[1] },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing[1] },
});
