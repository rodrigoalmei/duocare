import { StyleSheet, View } from 'react-native';

import { colors } from '@/constants/colors';
import { radius } from '@/constants/radius';
import { spacing } from '@/constants/spacing';

import { AppText } from '../ui';

type HealthChartCardProps = { values: number[]; labels?: string[]; title?: string };

export function HealthChartCard({ values, labels = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'], title = 'Atividade' }: HealthChartCardProps) {
  const max = Math.max(...values, 1);
  return (
    <View style={styles.card} accessibilityLabel="Resumo semanal demonstrativo em gráfico de barras">
      <View style={styles.header}>
        <AppText variant="label">{title}</AppText>
        <AppText variant="caption" color={colors.status.error} style={styles.demo}>
          DEMONSTRATIVO
        </AppText>
      </View>
      <View style={styles.chart}>
        {values.map((value, index) => (
          <View key={`${labels[index]}-${index}`} style={styles.barColumn}>
            <View
              style={[
                styles.bar,
                {
                  height: Math.max(18, (value / max) * 86),
                  backgroundColor: index === 3 ? colors.brand.coral : colors.brand.softPink,
                },
              ]}
            />
            <AppText variant="caption" color={colors.neutral[500]}>
              {labels[index]}
            </AppText>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { width: '100%', minHeight: 190, borderRadius: radius.lg, backgroundColor: colors.surface, padding: spacing[4], gap: spacing[4] },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: spacing[2] },
  demo: { fontFamily: 'Inter_600SemiBold' },
  chart: { minHeight: 112, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: spacing[2] },
  barColumn: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', gap: spacing[2] },
  bar: { width: '70%', maxWidth: 24, minWidth: 12, borderRadius: radius.sm },
});
