import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, View } from 'react-native';

import { FeatureCard } from '@/components/cards';
import { AppScreenContainer, ResponsiveGrid } from '@/components/layout';
import { BackHeader } from '@/components/navigation';
import { EmptyState, ErrorState, LoadingState } from '@/components/system';
import { AppText, Card } from '@/components/ui';
import { colors } from '@/constants/colors';
import { radius } from '@/constants/radius';
import { spacing } from '@/constants/spacing';
import { usePostpartum } from '@/hooks/usePostpartum';

export default function PostpartumScreen() {
  const router = useRouter();
  const { data, loading, error, refresh } = usePostpartum();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState title="Não foi possível carregar o puerpério" description={error} hint="Tente novamente." actionLabel="Tentar novamente" onAction={() => void refresh()} />;
  if (!data) return <EmptyState title="Resumo indisponível" description="Ainda não há dados de puerpério disponíveis." hint="Atualize para verificar novamente." actionLabel="Atualizar" onAction={() => void refresh()} />;
  return (
    <AppScreenContainer scroll edges={['top', 'bottom', 'left', 'right']} contentStyle={styles.screen}>
      <BackHeader title="Puerpério" />
      <View style={styles.heading}><AppText variant="caption" color={colors.brand.coral}>MEU PUERPÉRIO</AppText><AppText variant="h1">Cuidado nesta fase</AppText><AppText variant="bodyLarge" color={colors.textSecondary}>Acompanhamento organizado para o seu momento.</AppText></View>
      <View style={styles.hero}><View style={styles.heroCopy}><AppText variant="caption" color={colors.brand.coral}>FASE ATUAL</AppText><AppText variant="h2">{data.days} dias pós-parto*</AppText><AppText variant="body" color={colors.textSecondary}>{data.phase}</AppText></View><Image source={data.avatar} accessibilityLabel="Mãe e bebê" resizeMode="cover" style={styles.image} /></View>
      <ResponsiveGrid smallPhoneColumns={1} phoneColumns={1} tabletColumns={3} largeTabletColumns={3}>
        <FeatureCard title="Acompanhamento" icon="heart-outline" tone="mother" onPress={() => router.push('/health' as Href)} />
        <FeatureCard title="Conteúdos" icon="book-outline" tone="neutral" onPress={() => router.push('/contents' as Href)} />
        <FeatureCard title="Exercícios" icon="fitness-outline" tone="baby" onPress={() => router.push('/exercises' as Href)} />
      </ResponsiveGrid>
      <Card style={styles.notice}><AppText variant="label">Conteúdo em validação</AppText><AppText variant="body" color={colors.textSecondary}>Conteúdos e exercícios dependem da validação dos profissionais responsáveis.</AppText></Card>
    </AppScreenContainer>
  );
}
const styles = StyleSheet.create({ screen: { gap: spacing[5] }, heading: { gap: spacing[2] }, hero: { minHeight: 210, flexDirection: 'row', alignItems: 'center', gap: spacing[4], padding: spacing[5], borderRadius: radius.xl, backgroundColor: colors.brand.lightPink }, heroCopy: { flex: 1, minWidth: 0, gap: spacing[2] }, image: { width: 132, height: 150, borderRadius: radius.lg }, notice: { gap: spacing[2], backgroundColor: colors.status.warningSurface } });
