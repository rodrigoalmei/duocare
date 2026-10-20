import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { ContentCard, StatusCard } from '@/components/cards';
import { ResponsiveGrid, ScreenContainer } from '@/components/layout';
import { AppHeader } from '@/components/navigation';
import { EmptyState, ErrorState, LoadingState } from '@/components/system';
import { AppText, Chip } from '@/components/ui';
import { colors } from '@/constants/colors';
import { radius } from '@/constants/radius';
import { spacing } from '@/constants/spacing';
import { useData } from '@/contexts/DataContext';
import { useResponsive } from '@/hooks/useResponsive';

export default function ContentsScreen() {
  const router = useRouter();
  const { mother, contents, loading, error, refresh } = useData();
  const { isTabletLayout } = useResponsive();
  const openContent = () => router.push('/content' as Href);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState title="Não foi possível carregar os conteúdos" description={error} hint="Tente carregar a biblioteca novamente." actionLabel="Tentar novamente" onAction={() => void refresh()} />;
  if (contents.length === 0) return <EmptyState title="Nenhum conteúdo disponível" description="A biblioteca ainda não possui itens publicados." hint="Atualize para verificar novamente." actionLabel="Atualizar" onAction={() => void refresh()} />;

  return (
    <ScreenContainer scroll contentStyle={styles.screen}>
      <AppHeader
        eyebrow="BIBLIOTECA"
        title="Conteúdos"
        subtitle={isTabletLayout ? 'Informação confiável para cada momento da jornada.' : 'Informações organizadas por temas.'}
        avatar={isTabletLayout ? mother?.avatar : undefined}
        avatarLabel="Foto da usuária"
      />

      <View style={styles.chips}>
        <Chip label="Todos" selected />
        <Chip label="Gestação" />
        <Chip label="Pós-parto" />
        <Chip label="Bebê" />
      </View>

      {isTabletLayout ? (
        <View style={styles.featuredRow}>
          <View style={styles.featuredImageFrame}>
            <Image
              accessibilityLabel="Mãe com bebê"
              source={contents[0].image}
              resizeMode="cover"
              style={styles.featuredImage}
            />
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Abrir conteúdo em destaque"
            onPress={openContent}
            style={({ pressed }) => [styles.featuredCard, pressed && styles.pressed]}>
            <AppText variant="caption" color={colors.status.error}>EM DESTAQUE</AppText>
            <AppText variant="h3">{contents[0].title}</AppText>
            <AppText variant="body" color={colors.textSecondary}>
              Conteúdo editorial neutro para demonstrar o layout.
            </AppText>
            <View style={styles.featuredAction}>
              <AppText variant="caption" color={colors.surface}>LER AGORA</AppText>
              <Ionicons name="arrow-forward" size={16} color={colors.surface} />
            </View>
          </Pressable>
        </View>
      ) : null}

      <View style={styles.section}>
        <AppText variant="h3">{isTabletLayout ? 'Leituras recentes' : 'Para o seu momento'}</AppText>
        <ResponsiveGrid
          smallPhoneColumns={1}
          phoneColumns={1}
          tabletColumns={2}
          largeTabletColumns={2}
          gap={spacing[4]}>
          {contents.map((item) => (
            <ContentCard key={item.id} item={item} compact onPress={openContent} />
          ))}
        </ResponsiveGrid>
      </View>

      {isTabletLayout ? (
        <View style={styles.savedCard}>
          <View style={styles.savedIcon}><Ionicons name="bookmark-outline" size={22} color={colors.text} /></View>
          <View style={styles.savedCopy}>
            <AppText variant="label">Conteúdos salvos</AppText>
            <AppText variant="body" color={colors.textSecondary}>Organize suas leituras para consultar depois.</AppText>
          </View>
        </View>
      ) : null}

      <StatusCard
        icon="document-text-outline"
        title="Conteúdo em validação"
        description="Novos materiais serão publicados após validação clínica."
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: { paddingTop: spacing[2], gap: spacing[5] },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing[2] },
  featuredRow: { width: '100%', minHeight: 280, flexDirection: 'row', alignItems: 'stretch', gap: spacing[5] },
  featuredImageFrame: { flex: 1.65, minWidth: 0, height: 280, overflow: 'hidden', borderRadius: radius.xl, backgroundColor: colors.brand.softPink },
  featuredImage: { width: '100%', height: '100%' },
  featuredCard: {
    flex: 0.9,
    minWidth: 0,
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: spacing[4],
    padding: spacing[5],
    borderLeftWidth: 6,
    borderLeftColor: colors.brand.coral,
    borderRadius: radius.xl,
    backgroundColor: colors.brand.lightPink,
  },
  featuredAction: {
    minHeight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    paddingHorizontal: spacing[4],
    borderRadius: radius.full,
    backgroundColor: colors.brand.coral,
  },
  section: { width: '100%', gap: spacing[3] },
  savedCard: {
    width: '100%',
    minHeight: 132,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[4],
    padding: spacing[5],
    borderLeftWidth: 6,
    borderLeftColor: colors.brand.softPink,
    borderRadius: radius.xl,
    backgroundColor: colors.neutral[100],
  },
  savedIcon: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center', borderRadius: radius.full, backgroundColor: colors.surface },
  savedCopy: { flex: 1, minWidth: 0, gap: spacing[2] },
  pressed: { opacity: 0.78 },
});
