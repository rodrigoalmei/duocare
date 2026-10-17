import { StyleSheet, View } from 'react-native';

import { HealthChartCard, HealthMetricCard, WearableCard } from '@/components/health';
import { StatusCard } from '@/components/cards';
import { AppText, ScreenContainer } from '@/components/ui';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { useResponsive } from '@/hooks/useResponsive';
import { healthMetricsMock, wearableMock, weeklyActivityMock } from '@/mocks/health.mock';

export default function HealthScreen() {
  const { isSmallPhone, isTablet } = useResponsive();
  const columnCount = isSmallPhone ? 2 : 3;
  const metricRows = Array.from({ length: Math.ceil(healthMetricsMock.length / columnCount) }, (_, row) =>
    healthMetricsMock.slice(row * columnCount, row * columnCount + columnCount),
  );
  return (
    <ScreenContainer scroll contentStyle={styles.screen}>
      <View style={styles.headingRow}>
        <View style={styles.heading}>
          <AppText variant="caption" color={colors.brand.coral} style={styles.kicker}>MINHA SAÚDE</AppText>
          <AppText variant="h1">Seu bem-estar</AppText>
        </View>
        <View style={styles.demoPill}><AppText variant="caption">DADOS DEMO</AppText></View>
      </View>
      <View style={[styles.dashboard, isTablet && styles.dashboardTablet]}>
        <View style={[styles.column, isTablet && styles.columnTablet]}>
          <WearableCard device={wearableMock} />
          <View style={styles.section}>
            <AppText variant="h3">Hoje</AppText>
            <View style={styles.metrics}>
              {metricRows.map((row) => (
                <View key={row[0].id} style={styles.metricRow}>
                  {row.map((metric) => (
                    <View key={metric.id} style={styles.metricCell}>
                      <HealthMetricCard metric={metric} />
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </View>
        </View>
        <View style={[styles.column, isTablet && styles.columnTablet]}>
          <View style={styles.section}>
            <AppText variant="h3">Resumo da semana</AppText>
            <HealthChartCard values={weeklyActivityMock} />
          </View>
          <StatusCard icon="information-outline" title="Dados demonstrativos" description="Valores fictícios para visualização. Sem interpretação clínica." />
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: { paddingTop: spacing[4], gap: spacing[5] },
  headingRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: spacing[3] },
  heading: { flex: 1, gap: spacing[1] },
  kicker: { fontFamily: 'Inter_600SemiBold' },
  demoPill: { paddingHorizontal: spacing[4], paddingVertical: spacing[2], borderRadius: 999, backgroundColor: colors.brand.lightPink },
  dashboard: { gap: spacing[5] },
  dashboardTablet: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing[6] },
  column: { minWidth: 0, gap: spacing[5] },
  columnTablet: { flex: 1 },
  section: { gap: spacing[3] },
  metrics: { gap: spacing[3] },
  metricRow: { flexDirection: 'row', gap: spacing[3] },
  metricCell: { flex: 1, minWidth: 0 },
});
