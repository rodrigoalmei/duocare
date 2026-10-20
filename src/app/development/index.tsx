import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { BabySummaryCard } from '@/components/baby';
import { ContentCard } from '@/components/cards';
import { AppScreenContainer, ResponsiveGrid } from '@/components/layout';
import { BackHeader } from '@/components/navigation';
import { EmptyState, ErrorState, LoadingState } from '@/components/system';
import { AppText, Card } from '@/components/ui';
import { colors } from '@/constants/colors';
import { radius } from '@/constants/radius';
import { spacing } from '@/constants/spacing';
import { useBabyDevelopment } from '@/hooks/useBabyDevelopment';

export default function DevelopmentScreen() {
  const router = useRouter();
  const { data, loading, error, refresh } = useBabyDevelopment();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState title="Não foi possível carregar o desenvolvimento" description={error} hint="Tente novamente." actionLabel="Tentar novamente" onAction={() => void refresh()} />;
  if (!data || data.milestones.length === 0) return <EmptyState title="Nenhum registro de desenvolvimento" description="Ainda não há registros demonstrativos disponíveis." hint="Atualize para verificar novamente." actionLabel="Atualizar" onAction={() => void refresh()} />;
  return (
    <AppScreenContainer scroll edges={['top', 'bottom', 'left', 'right']} contentStyle={styles.screen}>
      <BackHeader title="Desenvolvimento" />
      <View style={styles.heading}><AppText variant="caption" color={colors.status.warning}>MEU BEBÊ</AppText><AppText variant="h1">Desenvolvimento</AppText><AppText variant="bodyLarge" color={colors.textSecondary}>Registros do bebê em uma linha do tempo clara, sem avaliação clínica.</AppText></View>
      <BabySummaryCard baby={data.baby} />
      <ResponsiveGrid smallPhoneColumns={1} phoneColumns={1} tabletColumns={3} largeTabletColumns={3}>
        {data.milestones.map((item) => <Card key={item.id} onPress={() => router.push('/milestones' as Href)} accessibilityLabel={item.title} style={styles.timelineCard}><View style={styles.index}><AppText variant="label">{item.index}</AppText></View><View style={styles.copy}><AppText variant="title">{item.title}</AppText><AppText variant="body" color={colors.textSecondary}>{item.description}</AppText></View></Card>)}
      </ResponsiveGrid>
      {data.featuredContent ? <ContentCard item={data.featuredContent} onPress={() => router.push('/content' as Href)} /> : null}
    </AppScreenContainer>
  );
}
const styles = StyleSheet.create({ screen: { gap: spacing[5] }, heading: { gap: spacing[2] }, timelineCard: { minHeight: 144, flexDirection: 'row', alignItems: 'center', gap: spacing[3], backgroundColor: '#FFF2DC' }, index: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: radius.full, backgroundColor: colors.surface }, copy: { flex: 1, minWidth: 0, gap: spacing[1] } });
