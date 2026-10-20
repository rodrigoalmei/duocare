import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppScreenContainer } from '@/components/layout';
import { BackHeader } from '@/components/navigation';
import { AppText, Card, PrimaryButton } from '@/components/ui';
import { colors } from '@/constants/colors';
import { radius } from '@/constants/radius';
import { spacing } from '@/constants/spacing';
import { useResponsive } from '@/hooks/useResponsive';

import { HealthChartCard } from './HealthChartCard';
import { PeriodTabs } from './PeriodTabs';

type Props = {
  title: string;
  description: string;
  value: string;
  chartValues: number[];
  onOpenHistory: () => void;
};

export function HealthDetailScreen({ title, description, value, chartValues, onOpenHistory }: Props) {
  const [period, setPeriod] = useState('7 dias');
  const { isTabletLayout } = useResponsive();
  return (
    <AppScreenContainer scroll edges={['top', 'bottom', 'left', 'right']} contentStyle={styles.screen}>
      <BackHeader title={title} />
      <View style={styles.heading}><AppText variant="caption" color={colors.brand.coral}>MINHA SAÚDE</AppText><AppText variant="h1">{title}</AppText><AppText variant="bodyLarge" color={colors.textSecondary}>{description}</AppText></View>
      <PeriodTabs selected={period} onSelect={setPeriod} />
      <View style={[styles.dashboard, isTabletLayout && styles.dashboardTablet]}>
        <Card style={styles.metricCard}><AppText variant="caption" color={colors.status.info}>RESUMO DEMONSTRATIVO</AppText><AppText variant="display">{value}</AppText><AppText variant="body" color={colors.textSecondary}>{period} · dado fictício</AppText></Card>
        <View style={styles.chart}><HealthChartCard values={chartValues} /></View>
      </View>
      <Card style={styles.note}><AppText variant="title">Sobre estes dados</AppText><AppText variant="body" color={colors.textSecondary}>Origem e período são identificados. Não há meta, faixa de normalidade ou interpretação clínica.</AppText></Card>
      <PrimaryButton label="Ver histórico" onPress={onOpenHistory} />
    </AppScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: { gap: spacing[5] },
  heading: { gap: spacing[2] },
  dashboard: { gap: spacing[4] },
  dashboardTablet: { flexDirection: 'row', alignItems: 'stretch' },
  metricCard: { flex: 0.8, minWidth: 0, minHeight: 190, justifyContent: 'center', gap: spacing[3], borderRadius: radius.xl, backgroundColor: colors.status.infoSurface },
  chart: { flex: 1.2, minWidth: 0 },
  note: { gap: spacing[2], backgroundColor: colors.neutral[100] },
});
