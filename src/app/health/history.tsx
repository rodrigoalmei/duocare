import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { HealthChartCard, PeriodTabs } from '@/components/health';
import { AppScreenContainer, ResponsiveGrid } from '@/components/layout';
import { BackHeader } from '@/components/navigation';
import { EmptyState, ErrorState, LoadingState } from '@/components/system';
import { AppText, Card } from '@/components/ui';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { useHealthHistory } from '@/hooks/useHealthDetails';

export default function HealthHistoryScreen() {
  const [metric, setMetric] = useState('Sono');
  const { data, loading, error, refresh } = useHealthHistory();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState title="Não foi possível carregar o histórico" description={error} hint="Tente novamente." actionLabel="Tentar novamente" onAction={() => void refresh()} />;
  if (!data || data.history.length === 0) return <EmptyState title="Histórico vazio" description="Ainda não há registros demonstrativos disponíveis." hint="Atualize para verificar novamente." actionLabel="Atualizar" onAction={() => void refresh()} />;
  return (
    <AppScreenContainer scroll edges={['top', 'bottom', 'left', 'right']} contentStyle={styles.screen}>
      <BackHeader title="Histórico de saúde" />
      <View style={styles.heading}><AppText variant="caption" color={colors.brand.coral}>MINHA SAÚDE</AppText><AppText variant="h1">Histórico de saúde</AppText><AppText variant="bodyLarge" color={colors.textSecondary}>Consulte dados ao longo do tempo com origem e período claros.</AppText></View>
      <PeriodTabs periods={['Sono', 'Passos', 'Bem-estar']} selected={metric} onSelect={setMetric} />
      <HealthChartCard values={data.weeklyActivity} />
      <ResponsiveGrid smallPhoneColumns={1} phoneColumns={1} tabletColumns={2} largeTabletColumns={3}>
        {data.history.map((item) => <Card key={item.id} style={styles.item}><View><AppText variant="caption" color={colors.brand.coral}>{item.date}</AppText><AppText variant="title">{item.label}</AppText></View><AppText variant="h3">{item.value}</AppText><AppText variant="caption" color={colors.textSecondary}>{item.source}</AppText></Card>)}
      </ResponsiveGrid>
    </AppScreenContainer>
  );
}
const styles = StyleSheet.create({ screen: { gap: spacing[5] }, heading: { gap: spacing[2] }, item: { minHeight: 132, justifyContent: 'space-between', gap: spacing[2] } });
