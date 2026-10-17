import { Image, Pressable, StyleSheet, View } from 'react-native';

import { colors } from '@/constants/colors';
import { radius } from '@/constants/radius';
import { spacing } from '@/constants/spacing';
import type { ContentItem } from '@/types';

import { AppText } from '../ui';

type ContentCardProps = { item: ContentItem; onPress?: () => void; compact?: boolean };

export function ContentCard({ item, onPress, compact = false }: ContentCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Abrir conteúdo: ${item.title}`}
      onPress={onPress}
      style={({ pressed }) => [styles.card, compact && styles.compact, pressed && styles.pressed]}>
      <Image source={item.image} resizeMode="cover" style={[styles.image, compact && styles.compactImage]} />
      <View style={styles.copy}>
        <AppText variant="caption" color={colors.brand.coral} style={styles.category}>
          {item.category}
        </AppText>
        <AppText variant="title" numberOfLines={compact ? 2 : 3}>
          {item.title}
        </AppText>
        <AppText variant="caption" color={colors.textSecondary}>
          {item.duration}
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    minHeight: 106,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    padding: spacing[3],
    borderRadius: radius.lg,
    backgroundColor: colors.neutral[100],
  },
  compact: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  image: { width: 80, height: 80, borderRadius: radius.md, backgroundColor: colors.brand.softPink },
  compactImage: { width: 72, height: 72 },
  copy: { flex: 1, minWidth: 0, gap: spacing[1] },
  category: { fontFamily: 'Inter_600SemiBold' },
  pressed: { opacity: 0.78 },
});
