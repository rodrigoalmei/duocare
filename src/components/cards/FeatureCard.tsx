import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { colors } from '@/constants/colors';
import { radius } from '@/constants/radius';
import { spacing } from '@/constants/spacing';

import { AppText } from '../ui';

type FeatureCardProps = {
  title: string;
  icon: ComponentProps<typeof Ionicons>['name'];
  tone?: 'mother' | 'baby' | 'info' | 'neutral';
  onPress?: () => void;
};

const toneColor = {
  mother: colors.brand.lightPink,
  baby: '#FFF2DC',
  info: colors.brand.contrastBlue,
  neutral: colors.neutral[100],
};

export function FeatureCard({ title, icon, tone = 'neutral', onPress }: FeatureCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      style={({ pressed }) => [styles.card, { backgroundColor: toneColor[tone] }, pressed && styles.pressed]}>
      <View style={styles.iconCircle}>
        <Ionicons name={icon} size={22} color={colors.text} />
      </View>
      <AppText variant="caption" align="center" style={styles.label}>
        {title}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 100,
    flex: 1,
    minWidth: 96,
    borderRadius: radius.lg,
    padding: spacing[3],
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2],
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { fontFamily: 'Inter_600SemiBold' },
  pressed: { opacity: 0.78, transform: [{ scale: 0.98 }] },
});
