import { Image, StyleSheet, View } from 'react-native';

import { colors } from '@/constants/colors';
import { radius } from '@/constants/radius';
import { spacing } from '@/constants/spacing';
import { useResponsive } from '@/hooks/useResponsive';
import type { Baby } from '@/types';

import { AppText } from '../ui';

export function BabySummaryCard({ baby }: { baby: Baby }) {
  const { isSmallPhone } = useResponsive();
  const imageSize = isSmallPhone ? 96 : 118;
  return (
    <View style={styles.card}>
      <View style={styles.copy}>
        <AppText variant="caption" color={colors.status.warning} style={styles.kicker}>
          SEU BEBÊ TEM
        </AppText>
        <AppText variant="h2">{baby.ageLabel}</AppText>
        <AppText variant="body" color={colors.textSecondary}>
          {baby.weightLabel} · {baby.lengthLabel}
        </AppText>
        <AppText variant="caption" color={colors.textSecondary}>
          Dados aguardando validação
        </AppText>
      </View>
      <Image
        accessibilityLabel="Imagem demonstrativa do bebê"
        source={baby.avatar}
        resizeMode="cover"
        style={[styles.image, { width: imageSize, height: imageSize }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { width: '100%', minHeight: 166, borderRadius: radius.xl, backgroundColor: colors.brand.babyCream, padding: spacing[4], flexDirection: 'row', alignItems: 'center', gap: spacing[3] },
  copy: { flex: 1, minWidth: 0, gap: spacing[2] },
  kicker: { fontFamily: 'Inter_600SemiBold' },
  image: { borderRadius: radius.lg, backgroundColor: colors.surface },
});
