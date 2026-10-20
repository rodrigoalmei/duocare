import type { ComponentProps } from 'react';
import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import { Image, Platform, Pressable, StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { ContentCard, FeatureCard, MetricCard } from '@/components/cards';
import { ResponsiveGrid, ScreenContainer } from '@/components/layout';
import { AppHeader } from '@/components/navigation';
import { EmptyState, ErrorState, LoadingState } from '@/components/system';
import { AppText } from '@/components/ui';
import { colors } from '@/constants/colors';
import { radius } from '@/constants/radius';
import { spacing } from '@/constants/spacing';
import { useData } from '@/contexts/DataContext';
import { useHealthOverview } from '@/hooks/useHealthDetails';
import { useResponsive } from '@/hooks/useResponsive';

type Feature = {
  title: string;
  icon: ComponentProps<typeof Ionicons>['name'];
  tone: 'mother' | 'baby' | 'info' | 'neutral';
  route?: Href;
};

const features: Feature[] = [
  { title: 'Minha saúde', icon: 'heart-outline', tone: 'mother', route: '/health' as Href },
  { title: 'Emoções', icon: 'happy-outline', tone: 'mother', route: '/wellbeing' as Href },
  { title: 'Amamentação', icon: 'nutrition-outline', tone: 'baby', route: '/breastfeeding' as Href },
  { title: 'Sono', icon: 'moon-outline', tone: 'info', route: '/health/sleep' as Href },
  { title: 'Exercícios', icon: 'fitness-outline', tone: 'neutral', route: '/exercises' as Href },
  { title: 'Sinais de alerta', icon: 'alert-circle-outline', tone: 'mother', route: '/alerts' as Href },
];

export default function HomeScreen() {
  const router = useRouter();
  const { mother, contents, loading, error, refresh } = useData();
  const health = useHealthOverview();
  const { isTabletLayout, isLargeTablet } = useResponsive();

  const openRoute = (route: Href) => {
    if (Platform.OS === 'web' && typeof route === 'string') {
      window.location.assign(route);
      return;
    }
    router.push(route);
  };

  if (loading || health.loading) return <LoadingState />;
  if (error || health.error) return <ErrorState title="Não foi possível carregar a Home" description={error ?? health.error ?? ''} hint="Tente carregar os dados novamente." actionLabel="Tentar novamente" onAction={() => void Promise.all([refresh(), health.refresh()])} />;
  if (!mother) return <EmptyState title="Perfil não encontrado" description="Ainda não há um perfil materno disponível." hint="Atualize os dados ou tente novamente mais tarde." actionLabel="Atualizar" onAction={() => void refresh()} />;
  const healthMetrics = health.data?.metrics ?? [];

  return (
    <ScreenContainer scroll contentStyle={styles.screen}>
      <AppHeader
        eyebrow="VISÃO GERAL"
        title={`Olá, ${mother.name}!`}
        subtitle={isTabletLayout ? 'Seu cuidado e o desenvolvimento do bebê, em um só lugar.' : 'Como você está se sentindo hoje?'}
        avatar={mother.avatar}
        avatarLabel="Abrir acompanhamento do bebê"
        actionIcon="notifications-outline"
        actionLabel="Abrir alertas"
        onActionPress={() => openRoute('/alerts' as Href)}
      />

      {isTabletLayout ? (
        <View style={styles.weekChip}>
          <AppText variant="caption" color={colors.status.error} style={styles.kicker}>SEMANA ATUAL</AppText>
        </View>
      ) : null}

      <View style={[styles.topCards, isTabletLayout && styles.topCardsTablet]}>
        <View style={[styles.postpartumCard, isTabletLayout && styles.postpartumCardTablet]}>
          <View style={styles.heroCopy}>
            <AppText variant="caption" color={colors.status.error} style={styles.kicker}>SEU PUERPÉRIO</AppText>
            <AppText variant="h2">{mother.postpartumDays} dias pós-parto*</AppText>
            <AppText variant="body" color={colors.textSecondary}>{mother.postpartumPhase}</AppText>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Ver acompanhamento do puerpério"
              onPress={() => openRoute('/postpartum' as Href)}
              style={({ pressed }) => [styles.heroButton, pressed && styles.pressed]}>
              <AppText variant="caption" style={styles.heroButtonLabel}>Ver acompanhamento</AppText>
            </Pressable>
          </View>
          <Image
            accessibilityLabel="Mãe com bebê"
            source={require('@/assets/illustrations/mother-baby-hero.png')}
            resizeMode="cover"
            style={[styles.heroImage, isLargeTablet && styles.heroImageLarge]}
          />
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Abrir Meu Bebê"
          onPress={() => openRoute('/baby' as Href)}
          style={({ pressed }) => [styles.babyCard, isTabletLayout && styles.babyCardTablet, pressed && styles.pressed]}>
          <View style={styles.babyCardCopy}>
            <AppText variant="h3">Meu bebê</AppText>
            <AppText variant="body" color={colors.textSecondary}>Veja registros recentes e acesse a área do bebê.</AppText>
            <View style={styles.inlineLink}>
              <AppText variant="caption" color={colors.status.warning} style={styles.kicker}>ABRIR ÁREA</AppText>
              <Ionicons name="arrow-forward" size={16} color={colors.status.warning} />
            </View>
          </View>
          {!isTabletLayout ? (
            <Image
              accessibilityLabel="Bebê"
              source={require('@/assets/illustrations/baby-development-hero.png')}
              resizeMode="cover"
              style={styles.babyImage}
            />
          ) : null}
        </Pressable>
      </View>

      <View style={styles.section}>
        <AppText variant="h3">Seu acompanhamento</AppText>
        <ResponsiveGrid
          smallPhoneColumns={2}
          phoneColumns={2}
          tabletColumns={3}
          largeTabletColumns={3}
          itemStyle={styles.featureCell}>
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              icon={feature.icon}
              tone={feature.tone}
              onPress={feature.route ? () => openRoute(feature.route!) : undefined}
            />
          ))}
        </ResponsiveGrid>
      </View>

      <View style={[styles.lowerDashboard, isTabletLayout && styles.lowerDashboardTablet]}>
        <View style={[styles.section, styles.flexSection]}>
          <AppText variant="h3">Resumo de hoje</AppText>
          <ResponsiveGrid
            smallPhoneColumns={2}
            phoneColumns={3}
            tabletColumns={3}
            largeTabletColumns={3}>
            {healthMetrics.map((metric) => <MetricCard key={metric.id} metric={metric} />)}
          </ResponsiveGrid>
        </View>
        <View style={[styles.section, styles.flexSection]}>
          <AppText variant="h3">Conteúdo em destaque</AppText>
          {contents[0] ? <ContentCard item={contents[0]} onPress={() => openRoute('/content' as Href)} /> : (
            <AppText variant="body" color={colors.textSecondary}>Nenhum conteúdo disponível.</AppText>
          )}
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: { paddingTop: spacing[2], gap: spacing[5] },
  weekChip: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    borderRadius: radius.full,
    backgroundColor: colors.brand.lightPink,
  },
  topCards: { width: '100%', gap: spacing[4] },
  topCardsTablet: { flexDirection: 'row', alignItems: 'stretch', gap: spacing[5] },
  postpartumCard: {
    width: '100%',
    minHeight: 156,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing[4],
    gap: spacing[3],
    borderLeftWidth: 6,
    borderLeftColor: colors.brand.coral,
    borderRadius: radius.xl,
    backgroundColor: colors.brand.lightPink,
  },
  postpartumCardTablet: { flex: 1.8, minWidth: 0, minHeight: 220 },
  heroCopy: { flex: 1, minWidth: 0, alignItems: 'flex-start', gap: spacing[2] },
  kicker: { fontFamily: 'Inter_600SemiBold' },
  heroButton: { minHeight: 36, justifyContent: 'center', paddingHorizontal: spacing[3], borderRadius: radius.full, backgroundColor: colors.brand.coral },
  heroButtonLabel: { fontFamily: 'Inter_600SemiBold' },
  heroImage: { width: 96, height: 112, borderRadius: radius.lg, backgroundColor: colors.brand.softPink },
  heroImageLarge: { width: 128, height: 150 },
  babyCard: {
    width: '100%',
    minHeight: 132,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing[4],
    gap: spacing[3],
    borderLeftWidth: 6,
    borderLeftColor: '#E29A3B',
    borderRadius: radius.xl,
    backgroundColor: '#FFF2DC',
  },
  babyCardTablet: { flex: 1, minWidth: 0, minHeight: 220 },
  babyCardCopy: { flex: 1, minWidth: 0, gap: spacing[3] },
  babyImage: { width: 86, height: 86, borderRadius: radius.lg, backgroundColor: colors.surface },
  inlineLink: { flexDirection: 'row', alignItems: 'center', gap: spacing[1] },
  section: { width: '100%', gap: spacing[3] },
  featureCell: { minHeight: 100 },
  lowerDashboard: { width: '100%', gap: spacing[5] },
  lowerDashboardTablet: { flexDirection: 'row', alignItems: 'stretch', gap: spacing[5] },
  flexSection: { flex: 1, minWidth: 0 },
  pressed: { opacity: 0.76 },
});
