import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { BabyFeatureCard } from '@/components/baby';
import { AppScreenContainer, ResponsiveGrid } from '@/components/layout';
import { BackHeader } from '@/components/navigation';
import { EmptyState, ErrorState, LoadingState } from '@/components/system';
import { AppText, Card, Chip, PrimaryButton } from '@/components/ui';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { useBabyDevelopment } from '@/hooks/useBabyDevelopment';

export default function MilestonesScreen() {
  const router = useRouter();
  const { data, loading, error, refresh } = useBabyDevelopment();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState title="Não foi possível carregar os marcos" description={error} hint="Tente novamente." actionLabel="Tentar novamente" onAction={() => void refresh()} />;
  if (!data || data.milestones.length === 0) return <EmptyState title="Nenhum marco disponível" description="Ainda não há registros demonstrativos." hint="Atualize para verificar novamente." actionLabel="Atualizar" onAction={() => void refresh()} />;
  return (
    <AppScreenContainer scroll edges={['top', 'bottom', 'left', 'right']} contentStyle={styles.screen}>
      <BackHeader title="Marcos do desenvolvimento" />
      <View style={styles.heading}><AppText variant="caption" color={colors.status.warning}>MEU BEBÊ</AppText><AppText variant="h1">Marcos do desenvolvimento</AppText><AppText variant="bodyLarge" color={colors.textSecondary}>Linha do tempo estrutural, sem avaliação de atraso ou classificação.</AppText></View>
      <View style={styles.chips}><Chip label="Visão geral" selected /><Chip label="Histórico" /></View>
      <ResponsiveGrid smallPhoneColumns={1} phoneColumns={1} tabletColumns={3} largeTabletColumns={3}>
        {data.milestones.map((item, index) => <Card key={item.id} style={styles.phase}><BabyFeatureCard title={item.title} icon={index === 1 ? 'sparkles-outline' : 'ellipse-outline'} tone="baby" /><AppText variant="body" color={colors.textSecondary}>{item.description}</AppText></Card>)}
      </ResponsiveGrid>
      <PrimaryButton label="Ver crescimento" onPress={() => router.push('/growth' as Href)} />
    </AppScreenContainer>
  );
}
const styles = StyleSheet.create({ screen: { gap: spacing[5] }, heading: { gap: spacing[2] }, chips: { flexDirection: 'row', gap: spacing[2] }, phase: { minHeight: 180, gap: spacing[3] } });
