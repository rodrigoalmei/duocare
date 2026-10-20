import type { ComponentProps } from 'react';
import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { BabyFeatureCard, BabySummaryCard } from '@/components/baby';
import { ResponsiveGrid, ScreenContainer } from '@/components/layout';
import { AppHeader } from '@/components/navigation';
import { EmptyState, ErrorState, LoadingState } from '@/components/system';
import { AppText } from '@/components/ui';
import { colors } from '@/constants/colors';
import { radius } from '@/constants/radius';
import { spacing } from '@/constants/spacing';
import { useData } from '@/contexts/DataContext';
import { useResponsive } from '@/hooks/useResponsive';

type BabyFeature = {
  title: string;
  icon: ComponentProps<typeof Ionicons>['name'];
  tone: 'mother' | 'baby' | 'info' | 'neutral';
  route?: Href;
};

const features: BabyFeature[] = [
  { title: 'Alimentação', icon: 'restaurant-outline', tone: 'baby' },
  { title: 'Sono', icon: 'moon-outline', tone: 'info' },
  { title: 'Fraldas', icon: 'water-outline', tone: 'mother' },
  { title: 'Crescimento', icon: 'trending-up-outline', tone: 'baby', route: '/growth' as Href },
  { title: 'Desenvolvimento', icon: 'sparkles-outline', tone: 'baby', route: '/development' as Href },
  { title: 'Vacinas', icon: 'medical-outline', tone: 'neutral' },
];

export default function BabyScreen() {
  const router = useRouter();
  const { baby, loading, error, refresh } = useData();
  const { isTabletLayout } = useResponsive();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState title="Não foi possível carregar os dados do bebê" description={error} hint="Tente novamente." actionLabel="Tentar novamente" onAction={() => void refresh()} />;
  if (!baby) return <EmptyState title="Dados do bebê não encontrados" description="Ainda não há um perfil do bebê disponível." hint="Atualize os dados para continuar." actionLabel="Atualizar" onAction={() => void refresh()} />;

  return (
    <ScreenContainer scroll contentStyle={styles.screen}>
      <AppHeader
        eyebrow="BEBÊ"
        title="Meu bebê"
        subtitle={isTabletLayout ? 'Registros e desenvolvimento organizados com clareza.' : 'Idade atual · demonstrativo'}
        avatar={baby.avatar}
        avatarLabel="Imagem demonstrativa do bebê"
      />

      <View style={[styles.heroRow, isTabletLayout && styles.heroRowTablet]}>
        <View style={[styles.summary, isTabletLayout && styles.summaryTablet]}>
          <BabySummaryCard baby={baby} />
        </View>
        <View style={[styles.progressCard, isTabletLayout && styles.progressCardTablet]}>
          <View style={styles.progressIcon}><Ionicons name="sparkles" size={26} color={colors.text} /></View>
          <View style={styles.progressCopy}>
            <AppText variant="h3">{isTabletLayout ? 'Visão geral' : 'Muito bem!'}</AppText>
            <AppText variant="body" color={colors.textSecondary}>
              Informações e registros reunidos sem comparações ou diagnósticos.
            </AppText>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <AppText variant="h3">Acompanhamento</AppText>
        <ResponsiveGrid
          smallPhoneColumns={2}
          phoneColumns={2}
          tabletColumns={3}
          largeTabletColumns={3}
          itemStyle={styles.featureCell}>
          {features.map((feature) => (
            <BabyFeatureCard key={feature.title} title={feature.title} icon={feature.icon} tone={feature.tone} onPress={feature.route ? () => router.push(feature.route!) : undefined} />
          ))}
        </ResponsiveGrid>
      </View>

      <View style={[styles.supportRow, isTabletLayout && styles.supportRowTablet]}>
        <View style={[styles.routineCard, styles.supportItem]}>
          <View style={styles.routineIcon}>
            <Ionicons name="calendar-outline" size={24} color={colors.text} />
          </View>
          <View style={styles.progressCopy}>
            <AppText variant="h3">Rotina e cuidados</AppText>
            <AppText variant="body" color={colors.textSecondary}>
              Acesso rápido a conteúdos, lembretes e anotações do bebê.
            </AppText>
          </View>
        </View>
        <View style={[styles.notice, styles.supportItem]}>
          <Ionicons name="information-circle-outline" size={22} color={colors.text} />
          <View style={styles.progressCopy}>
            <AppText variant="label">Conteúdo em validação</AppText>
            <AppText variant="caption" color={colors.textSecondary}>
              Nenhuma orientação clínica definitiva é apresentada neste protótipo.
            </AppText>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: { paddingTop: spacing[2], gap: spacing[5] },
  heroRow: { width: '100%', gap: spacing[4] },
  heroRowTablet: { flexDirection: 'row', alignItems: 'stretch', gap: spacing[5] },
  summary: { width: '100%' },
  summaryTablet: { flex: 1.65, minWidth: 0 },
  progressCard: {
    width: '100%',
    minHeight: 124,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    padding: spacing[4],
    borderLeftWidth: 6,
    borderLeftColor: '#E29A3B',
    borderRadius: radius.xl,
    backgroundColor: '#FFF2DC',
  },
  progressCardTablet: { flex: 0.85, minWidth: 0, minHeight: 260, alignItems: 'flex-start', paddingTop: spacing[6] },
  progressIcon: { width: 52, height: 52, borderRadius: radius.full, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.brand.babyCream },
  progressCopy: { flex: 1, minWidth: 0, gap: spacing[2] },
  section: { width: '100%', gap: spacing[3] },
  featureCell: { minHeight: 100 },
  supportRow: { width: '100%', gap: spacing[4] },
  supportRowTablet: { flexDirection: 'row', alignItems: 'stretch', gap: spacing[5] },
  supportItem: { flex: 1, minWidth: 0 },
  routineCard: {
    minHeight: 128,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    padding: spacing[4],
    borderLeftWidth: 6,
    borderLeftColor: colors.brand.coral,
    borderRadius: radius.xl,
    backgroundColor: colors.brand.lightPink,
  },
  routineIcon: { width: 48, height: 48, borderRadius: radius.full, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface },
  notice: {
    minHeight: 128,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    padding: spacing[4],
    borderLeftWidth: 6,
    borderLeftColor: colors.brand.softPink,
    borderRadius: radius.xl,
    backgroundColor: colors.neutral[100],
  },
});
