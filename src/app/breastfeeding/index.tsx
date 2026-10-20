import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ContentCard } from '@/components/cards';
import { AppScreenContainer, ResponsiveGrid } from '@/components/layout';
import { BackHeader } from '@/components/navigation';
import { EmptyState, ErrorState, LoadingState } from '@/components/system';
import { AppText, Card, Chip, PrimaryButton } from '@/components/ui';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { useBreastfeedingContent } from '@/hooks/useContentDomains';

export default function BreastfeedingScreen() {
  const router = useRouter();
  const { data, loading, error, refresh } = useBreastfeedingContent();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState title="Não foi possível carregar os conteúdos" description={error} hint="Tente novamente." actionLabel="Tentar novamente" onAction={() => void refresh()} />;
  if (!data) return <EmptyState title="Conteúdo indisponível" description="Ainda não há conteúdo de amamentação disponível." hint="Atualize para verificar novamente." actionLabel="Atualizar" onAction={() => void refresh()} />;
  return (
    <AppScreenContainer scroll edges={['top', 'bottom', 'left', 'right']} contentStyle={styles.screen}>
      <BackHeader title="Amamentação" />
      <View style={styles.heading}><AppText variant="caption" color={colors.brand.coral}>CONTEÚDOS</AppText><AppText variant="h1">Amamentação</AppText><AppText variant="bodyLarge" color={colors.textSecondary}>Conteúdos organizados para consulta, sujeitos à validação clínica.</AppText></View>
      <View style={styles.chips}><Chip label="Destaques" selected /><Chip label="Dúvidas" /></View>
      <ResponsiveGrid smallPhoneColumns={1} phoneColumns={1} tabletColumns={2} largeTabletColumns={2}>
        <ContentCard item={data} onPress={() => router.push('/content' as Href)} />
        <Card style={styles.faq}><AppText variant="h3">Dúvidas frequentes</AppText><AppText variant="body" color={colors.textSecondary}>Tópicos estruturais sem orientação clínica final.</AppText></Card>
      </ResponsiveGrid>
      <Card style={styles.support}><View style={styles.supportCopy}><AppText variant="title">Precisa conversar?</AppText><AppText variant="body" color={colors.textSecondary}>Canal com a equipe · disponibilidade a validar.</AppText></View><PrimaryButton label="Ver ajuda e suporte" onPress={() => router.push('/support' as Href)} /></Card>
    </AppScreenContainer>
  );
}
const styles = StyleSheet.create({ screen: { gap: spacing[5] }, heading: { gap: spacing[2] }, chips: { flexDirection: 'row', gap: spacing[2] }, faq: { minHeight: 116, justifyContent: 'center', gap: spacing[2], backgroundColor: colors.brand.babyCream }, support: { gap: spacing[4], backgroundColor: colors.brand.lightPink }, supportCopy: { gap: spacing[2] } });
