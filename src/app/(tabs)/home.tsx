import type { ComponentProps } from 'react';
import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import { Image, Platform, Pressable, StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { ContentCard, FeatureCard, MetricCard } from '@/components/cards';
import { AppHeader } from '@/components/navigation';
import { AppText, ScreenContainer } from '@/components/ui';
import { colors } from '@/constants/colors';
import { radius } from '@/constants/radius';
import { spacing } from '@/constants/spacing';
import { useAppContext } from '@/contexts/AppContext';
import { useResponsive } from '@/hooks/useResponsive';
import { contentMock } from '@/mocks/content.mock';
import { healthMetricsMock } from '@/mocks/health.mock';

type Feature = {
  title: string;
  icon: ComponentProps<typeof Ionicons>['name'];
  tone: 'mother' | 'baby' | 'info' | 'neutral';
  route?: Href;
};

const features: Feature[] = [
  { title: 'Minha saúde', icon: 'heart-outline', tone: 'mother', route: '/health' as Href },
  { title: 'Emoções', icon: 'happy-outline', tone: 'mother' },
  { title: 'Amamentação', icon: 'nutrition-outline', tone: 'baby' },
  { title: 'Sono', icon: 'moon-outline', tone: 'info' },
  { title: 'Exercícios', icon: 'fitness-outline', tone: 'neutral' },
  { title: 'Sinais de alerta', icon: 'alert-circle-outline', tone: 'mother' },
];

export default function HomeScreen() {
  const router = useRouter();
  const { mother } = useAppContext();
  const { isSmallPhone, isTablet } = useResponsive();
  const columnCount = isSmallPhone ? 2 : 3;
  const featureRows = Array.from({ length: Math.ceil(features.length / columnCount) }, (_, row) =>
    features.slice(row * columnCount, row * columnCount + columnCount),
  );
  const metricRows = Array.from({ length: Math.ceil(healthMetricsMock.length / columnCount) }, (_, row) =>
    healthMetricsMock.slice(row * columnCount, row * columnCount + columnCount),
  );
  const openRoute = (route: Href) => {
    if (Platform.OS === 'web' && typeof route === 'string') {
      window.location.assign(route);
      return;
    }
    router.push(route);
  };

  return (
    <ScreenContainer scroll contentStyle={styles.screen}>
      <AppHeader
        title={`Olá, ${mother.name}!`}
        subtitle="Como você está se sentindo hoje?"
        avatar={mother.avatar}
        avatarLabel="Abrir acompanhamento do bebê"
        actionIcon="notifications-outline"
        actionLabel="Abrir alertas"
        onActionPress={() => openRoute('/alerts' as Href)}
      />

      <View style={[styles.dashboard, isTablet && styles.dashboardTablet]}>
        <View style={[styles.primaryColumn, isTablet && styles.primaryColumnTablet]}>
          <View style={styles.hero}>
            <View style={styles.heroCopy}>
              <AppText variant="caption" color={colors.status.error} style={styles.kicker}>SEU PUERPÉRIO</AppText>
              <AppText variant="h2">{mother.postpartumDays} dias pós-parto*</AppText>
              <AppText variant="body" color={colors.textSecondary}>{mother.postpartumPhase}</AppText>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Ver acompanhamento do bebê"
                onPress={() => openRoute('/baby' as Href)}
                style={({ pressed }) => [styles.heroButton, pressed && styles.pressed]}>
                <AppText variant="caption" style={styles.heroButtonLabel}>Ver acompanhamento</AppText>
              </Pressable>
            </View>
            <Image source={require('@/assets/illustrations/mother-baby-hero.png')} resizeMode="cover" style={styles.heroImage} />
          </View>

          <View style={styles.section}>
            <AppText variant="h3">Seu acompanhamento</AppText>
            <View style={styles.grid}>
              {featureRows.map((row) => (
                <View key={row[0].title} style={styles.gridRow}>
                  {row.map((feature) => (
                    <View key={feature.title} style={styles.featureCell}>
                      <FeatureCard title={feature.title} icon={feature.icon} tone={feature.tone} onPress={feature.route ? () => openRoute(feature.route!) : undefined} />
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={[styles.secondaryColumn, isTablet && styles.secondaryColumnTablet]}>
          <View style={styles.section}>
            <AppText variant="h3">Resumo de hoje</AppText>
            <View style={styles.metrics}>
              {metricRows.map((row) => (
                <View key={row[0].id} style={styles.metricRow}>
                  {row.map((metric) => (
                    <View key={metric.id} style={styles.metricCell}>
                      <MetricCard metric={metric} />
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <ContentCard item={contentMock[0]} onPress={() => router.push('/content' as Href)} />
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: { paddingTop: spacing[2], gap: spacing[4] },
  dashboard: { width: '100%', gap: spacing[5] },
  dashboardTablet: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing[6] },
  primaryColumn: { minWidth: 0, gap: spacing[5] },
  primaryColumnTablet: { flex: 1.15 },
  secondaryColumn: { minWidth: 0, gap: spacing[5] },
  secondaryColumnTablet: { flex: 0.85 },
  hero: { width: '100%', minHeight: 146, flexDirection: 'row', alignItems: 'center', borderRadius: radius.xl, backgroundColor: colors.brand.lightPink, padding: spacing[4], gap: spacing[3] },
  heroCopy: { flex: 1, minWidth: 0, alignItems: 'flex-start', gap: spacing[2] },
  kicker: { fontFamily: 'Inter_600SemiBold' },
  heroButton: { minHeight: 36, justifyContent: 'center', paddingHorizontal: spacing[3], borderRadius: radius.full, backgroundColor: colors.brand.coral },
  heroButtonLabel: { fontFamily: 'Inter_600SemiBold' },
  heroImage: { width: 96, height: 112, borderRadius: radius.lg, backgroundColor: colors.brand.softPink },
  section: { width: '100%', gap: spacing[3] },
  grid: { gap: spacing[3] },
  gridRow: { flexDirection: 'row', gap: spacing[3] },
  featureCell: { flex: 1, minWidth: 0, height: 100 },
  metrics: { gap: spacing[3] },
  metricRow: { flexDirection: 'row', gap: spacing[3] },
  metricCell: { flex: 1, minWidth: 0 },
  pressed: { opacity: 0.76 },
});
