import { StyleSheet, View } from 'react-native';

import { BabySummaryCard } from '@/components/baby';
import { HealthChartCard } from '@/components/health';
import { AppScreenContainer } from '@/components/layout';
import { BackHeader } from '@/components/navigation';
import { EmptyState, ErrorState, LoadingState } from '@/components/system';
import { AppText, Card, Chip, PrimaryButton } from '@/components/ui';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { useGrowth } from '@/hooks/useBabyDevelopment';

export default function GrowthScreen() {
  const { data, loading, error, refresh } = useGrowth();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState title="Não foi possível carregar o crescimento" description={error} hint="Tente novamente." actionLabel="Tentar novamente" onAction={() => void refresh()} />;
  if (!data || data.records.length === 0) return <EmptyState title="Nenhum registro de crescimento" description="Ainda não há registros demonstrativos." hint="Atualize para verificar novamente." actionLabel="Atualizar" onAction={() => void refresh()} />;
  return (
    <AppScreenContainer scroll edges={['top', 'bottom', 'left', 'right']} contentStyle={styles.screen}>
      <BackHeader title="Crescimento" />
      <View style={styles.heading}><AppText variant="caption" color={colors.status.warning}>MEU BEBÊ</AppText><AppText variant="h1">Crescimento</AppText><AppText variant="bodyLarge" color={colors.textSecondary}>Histórico descritivo com valores demonstrativos e sem classificação.</AppText></View>
      <BabySummaryCard baby={data.baby} />
      <View style={styles.chips}><Chip label="30 dias" /><Chip label="3 meses" selected /><Chip label="6 meses" /></View>
      <HealthChartCard title="Crescimento ao longo do tempo" values={data.records.map((record) => record.value)} labels={data.records.map((record) => record.label)} />
      <Card style={styles.note}><AppText variant="title">Sobre estes dados</AppText><AppText variant="body" color={colors.textSecondary}>Valores e unidades são demonstrativos. Nenhuma interpretação clínica é apresentada.</AppText></Card>
      <PrimaryButton label="Adicionar registro" />
    </AppScreenContainer>
  );
}
const styles = StyleSheet.create({ screen: { gap: spacing[5] }, heading: { gap: spacing[2] }, chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing[2] }, note: { gap: spacing[2], backgroundColor: colors.neutral[100] } });
