import { Image, StyleSheet, View } from 'react-native';

import { AppScreenContainer } from '@/components/layout';
import { BackHeader } from '@/components/navigation';
import { EmptyState, ErrorState, LoadingState } from '@/components/system';
import { AppText, PrimaryButton } from '@/components/ui';
import { colors } from '@/constants/colors';
import { radius } from '@/constants/radius';
import { spacing } from '@/constants/spacing';
import { useData } from '@/contexts/DataContext';
import { useResponsive } from '@/hooks/useResponsive';

export default function ContentDetailScreen() {
  const { contents, loading, error, refresh } = useData();
  const { isTabletLayout } = useResponsive();
  const item = contents[0];

  if (loading) return <LoadingState />;
  if (error) return <ErrorState title="Não foi possível carregar o conteúdo" description={error} hint="Tente novamente." actionLabel="Tentar novamente" onAction={() => void refresh()} />;
  if (!item) return <EmptyState title="Conteúdo não encontrado" description="Este item não está disponível." hint="Volte à biblioteca ou atualize os dados." actionLabel="Atualizar" onAction={() => void refresh()} />;

  return (
    <AppScreenContainer scroll edges={['top', 'bottom', 'left', 'right']} contentStyle={styles.screen} maxWidth={720}>
      <BackHeader title="Conteúdo" />
      <View style={styles.heading}><AppText variant="caption" color={colors.brand.coral}>{item.category}</AppText><AppText variant="h1">{item.title}</AppText><AppText variant="body" color={colors.textSecondary}>Estrutura editorial com conteúdo neutro sujeito à revisão clínica.</AppText></View>
      <View style={[styles.imageFrame, isTabletLayout && styles.imageFrameTablet]}>
        <Image source={item.image} resizeMode="cover" style={styles.image} />
      </View>
      <View style={styles.block}><AppText variant="title">Introdução</AppText>{item.body?.map((paragraph) => <AppText key={paragraph} variant="bodyLarge" color={colors.textSecondary}>{paragraph}</AppText>)}</View>
      <View style={styles.video}><AppText variant="caption" color={colors.textSecondary}>VÍDEO / PLACEHOLDER</AppText><AppText variant="body" color={colors.textSecondary}>Duração a definir</AppText></View>
      <View style={styles.block}><AppText variant="title">Conteúdos relacionados</AppText><AppText variant="body" color={colors.textSecondary}>Artigo relacionado 01 · aguardando validação.</AppText></View>
      <PrimaryButton label="Salvar conteúdo" />
    </AppScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: { gap: spacing[5] },
  heading: { gap: spacing[2] },
  imageFrame: { width: '100%', height: 190, overflow: 'hidden', borderRadius: radius.xl },
  imageFrameTablet: { height: 300 },
  image: { width: '100%', height: '100%' },
  block: { gap: spacing[3], padding: spacing[5], borderRadius: radius.lg, backgroundColor: colors.surface },
  video: { minHeight: 180, alignItems: 'center', justifyContent: 'center', gap: spacing[2], borderRadius: radius.xl, backgroundColor: colors.neutral[100] },
});
