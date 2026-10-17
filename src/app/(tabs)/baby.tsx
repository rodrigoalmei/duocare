import type { ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { BabyFeatureCard, BabySummaryCard } from '@/components/baby';
import { AppHeader } from '@/components/navigation';
import { AppText, ScreenContainer } from '@/components/ui';
import { colors } from '@/constants/colors';
import { radius } from '@/constants/radius';
import { spacing } from '@/constants/spacing';
import { useResponsive } from '@/hooks/useResponsive';
import { babyMock } from '@/mocks/baby.mock';

type BabyFeature = { title: string; icon: ComponentProps<typeof Ionicons>['name']; tone: 'mother' | 'baby' | 'info' | 'neutral' };
const features: BabyFeature[] = [
  { title: 'Alimentação', icon: 'restaurant-outline', tone: 'baby' },
  { title: 'Sono', icon: 'moon-outline', tone: 'info' },
  { title: 'Fraldas', icon: 'water-outline', tone: 'mother' },
  { title: 'Crescimento', icon: 'trending-up-outline', tone: 'baby' },
  { title: 'Desenvolvimento', icon: 'sparkles-outline', tone: 'baby' },
  { title: 'Vacinas', icon: 'medical-outline', tone: 'neutral' },
];

export default function BabyScreen() {
  const { isSmallPhone, isTablet } = useResponsive();
  const columnCount = isSmallPhone ? 2 : 3;
  const featureRows = Array.from({ length: Math.ceil(features.length / columnCount) }, (_, row) =>
    features.slice(row * columnCount, row * columnCount + columnCount),
  );
  return (
    <ScreenContainer scroll contentStyle={styles.screen}>
      <AppHeader title="Meu bebê" subtitle="Idade atual · demonstrativo" avatar={babyMock.avatar} avatarLabel="Imagem demonstrativa do bebê" />
      <View style={[styles.dashboard, isTablet && styles.dashboardTablet]}>
        <View style={[styles.column, isTablet && styles.columnTablet]}>
          <BabySummaryCard baby={babyMock} />
          <View style={styles.section}>
            <AppText variant="h3">Acompanhamento</AppText>
            <View style={styles.grid}>
              {featureRows.map((row) => (
                <View key={row[0].title} style={styles.gridRow}>
                  {row.map((feature) => (
                    <View key={feature.title} style={styles.cell}>
                      <BabyFeatureCard title={feature.title} icon={feature.icon} tone={feature.tone} />
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </View>
        </View>
        <View style={[styles.columnSecondary, isTablet && styles.columnSecondaryTablet]}>
          <View style={styles.progressCard}>
            <View style={styles.progressIcon}><Ionicons name="sparkles" size={26} color={colors.text} /></View>
            <View style={styles.progressCopy}>
              <AppText variant="h3">Muito bem!</AppText>
              <AppText variant="body" color={colors.textSecondary}>Acompanhe o desenvolvimento do seu bebê sem classificações clínicas.</AppText>
            </View>
          </View>
          <View style={styles.notice}>
            <Ionicons name="information-circle-outline" size={22} color={colors.text} />
            <AppText variant="caption" color={colors.textSecondary} style={styles.noticeCopy}>Informações demonstrativas aguardando validação.</AppText>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: { paddingTop: spacing[2], gap: spacing[4] },
  dashboard: { gap: spacing[5] },
  dashboardTablet: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing[6] },
  column: { minWidth: 0, gap: spacing[5] },
  columnTablet: { flex: 1.1 },
  columnSecondary: { minWidth: 0, gap: spacing[4] },
  columnSecondaryTablet: { flex: 0.9 },
  section: { gap: spacing[3] },
  grid: { gap: spacing[3] },
  gridRow: { flexDirection: 'row', gap: spacing[3] },
  cell: { flex: 1, minWidth: 0, height: 100 },
  progressCard: { width: '100%', minHeight: 124, flexDirection: 'row', alignItems: 'center', gap: spacing[3], padding: spacing[4], borderRadius: radius.xl, backgroundColor: '#FFF2DC' },
  progressIcon: { width: 52, height: 52, borderRadius: radius.full, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.brand.babyCream },
  progressCopy: { flex: 1, minWidth: 0, gap: spacing[1] },
  notice: { width: '100%', flexDirection: 'row', alignItems: 'center', gap: spacing[3], padding: spacing[4], borderRadius: radius.lg, backgroundColor: colors.surface },
  noticeCopy: { flex: 1 },
});
