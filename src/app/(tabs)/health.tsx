import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import { StatusCard } from '@/components/cards';
import { HealthChartCard, HealthMetricCard, WearableCard } from '@/components/health';
import { ResponsiveGrid, ScreenContainer } from '@/components/layout';
import { AppHeader } from '@/components/navigation';
import { EmptyState, ErrorState, LoadingState } from '@/components/system';
import { AppText } from '@/components/ui';
import { colors } from '@/constants/colors';
import { radius } from '@/constants/radius';
import { spacing } from '@/constants/spacing';
import { useData } from '@/contexts/DataContext';
import { useDevices } from '@/hooks/useDevices';
import { useHealthOverview } from '@/hooks/useHealthDetails';
import { useResponsive } from '@/hooks/useResponsive';

export default function HealthScreen() {
  const router = useRouter();
  const { mother, loading, error, refresh } = useData();
  const health = useHealthOverview();
  const devices = useDevices();
  const { isTabletLayout } = useResponsive();

  if (loading || health.loading || devices.loading) return <LoadingState />;
  if (error || health.error || devices.error) return <ErrorState title="Não foi possível carregar sua saúde" description={error ?? health.error ?? devices.error ?? ''} hint="Tente novamente." actionLabel="Tentar novamente" onAction={() => void Promise.all([refresh(), health.refresh(), devices.refresh()])} />;
  if (!health.data || !devices.data?.connected) return <EmptyState title="Dados de saúde indisponíveis" description="Os dados demonstrativos ainda não estão disponíveis." hint="Tente atualizar os dados." actionLabel="Atualizar" onAction={() => void Promise.all([health.refresh(), devices.refresh()])} />;

  const { metrics: healthMetrics, weeklyActivity } = health.data;
  const wearable = devices.data.connected;

  return (
    <ScreenContainer scroll contentStyle={styles.screen}>
      <AppHeader
        eyebrow="SAÚDE MATERNA"
        title="Minha Saúde"
        subtitle={isTabletLayout ? 'Uma visão simples dos dados conectados e dos seus registros.' : 'Seu bem-estar'}
        avatar={isTabletLayout ? mother?.avatar : undefined}
        avatarLabel="Foto da usuária"
      />

      <View style={[styles.deviceRow, isTabletLayout && styles.deviceRowTablet]}>
        {isTabletLayout ? (
          <View style={styles.deviceImageFrame}>
            <Image
              accessibilityLabel="Dispositivo conectado demonstrativo"
              source={require('@/assets/illustrations/wearable-health-hero.png')}
              resizeMode="cover"
              style={styles.deviceImage}
            />
          </View>
        ) : null}
        <View style={[styles.deviceCard, isTabletLayout && styles.deviceCardTablet]}>
          <WearableCard device={wearable} onPress={() => router.push('/devices' as Href)} style={isTabletLayout ? styles.wearableTablet : undefined} />
          {isTabletLayout ? (
            <View style={styles.deviceNote}>
              <AppText variant="body" color={colors.textSecondary}>
                Valores exibidos são demonstrativos e não representam interpretação clínica.
              </AppText>
            </View>
          ) : null}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeading}>
          <AppText variant="h3">Indicadores</AppText>
          <View style={styles.demoPill}><AppText variant="caption">DADOS DEMO</AppText></View>
        </View>
        <ResponsiveGrid
          smallPhoneColumns={2}
          phoneColumns={3}
          tabletColumns={3}
          largeTabletColumns={3}>
          {healthMetrics.map((metric) => (
            <Pressable key={metric.id} accessibilityRole="button" accessibilityLabel={`Abrir ${metric.label}`} onPress={() => metric.id === 'sleep' ? router.push('/health/sleep' as Href) : metric.id === 'steps' ? router.push('/health/steps' as Href) : router.push('/health/history' as Href)}>
              <HealthMetricCard metric={metric} />
            </Pressable>
          ))}
        </ResponsiveGrid>
      </View>

      <View style={styles.section}>
        <AppText variant="h3">Resumo da semana</AppText>
        <HealthChartCard values={weeklyActivity} />
      </View>

      <Pressable onPress={() => router.push('/health/history' as Href)}><StatusCard
        icon="information-outline"
        title="Privacidade em primeiro lugar"
        description="Você controla conexões e permissões dos seus dados. Valores fictícios, sem interpretação clínica."
      /></Pressable>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: { paddingTop: spacing[2], gap: spacing[5] },
  deviceRow: { width: '100%', gap: spacing[4] },
  deviceRowTablet: { minHeight: 220, flexDirection: 'row', alignItems: 'stretch', gap: spacing[5] },
  deviceImageFrame: { flex: 1, minWidth: 0, height: 220, borderRadius: radius.xl, overflow: 'hidden', backgroundColor: colors.status.infoSurface },
  deviceImage: { width: '100%', height: '100%' },
  deviceCard: { width: '100%', gap: spacing[3] },
  deviceCardTablet: { flex: 1.25, minWidth: 0 },
  wearableTablet: { flex: 1, minHeight: 138, alignItems: 'flex-start' },
  deviceNote: { paddingHorizontal: spacing[4] },
  section: { width: '100%', gap: spacing[3] },
  sectionHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing[3] },
  demoPill: { paddingHorizontal: spacing[4], paddingVertical: spacing[2], borderRadius: radius.full, backgroundColor: colors.brand.lightPink },
});
