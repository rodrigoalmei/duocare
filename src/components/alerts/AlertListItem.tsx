import { Pressable, StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { AppText } from '@/components/ui';
import { colors } from '@/constants/colors';
import { radius } from '@/constants/radius';
import { spacing } from '@/constants/spacing';
import type { AlertItem } from '@/types';

export function AlertListItem({ alert, onPress }: { alert: AlertItem; onPress?: () => void }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={`Abrir alerta: ${alert.title}`} onPress={onPress} style={({ pressed }) => [styles.card, !alert.read && styles.unread, pressed && styles.pressed]}>
      <View style={[styles.icon, !alert.read && styles.iconUnread]}><Ionicons name={alert.source.includes('dispositivo') ? 'sync-outline' : 'notifications-outline'} size={22} color={colors.text} /></View>
      <View style={styles.copy}><View style={styles.meta}><AppText variant="caption" color={colors.brand.coral}>{alert.source}</AppText>{!alert.read ? <View style={styles.dot} accessibilityLabel="Não lido" /> : null}</View><AppText variant="title">{alert.title}</AppText><AppText variant="body" color={colors.textSecondary}>{alert.description}</AppText><AppText variant="caption" color={colors.textSecondary}>{alert.createdAt}</AppText></View>
      <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
    </Pressable>
  );
}
const styles = StyleSheet.create({ card: { width: '100%', minHeight: 116, flexDirection: 'row', alignItems: 'center', gap: spacing[3], padding: spacing[4], borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, backgroundColor: colors.surface }, unread: { borderColor: colors.brand.motherPink, backgroundColor: colors.brand.lightPink }, icon: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', borderRadius: radius.full, backgroundColor: colors.neutral[100] }, iconUnread: { backgroundColor: colors.brand.motherPink }, copy: { flex: 1, minWidth: 0, gap: spacing[1] }, meta: { flexDirection: 'row', alignItems: 'center', gap: spacing[2] }, dot: { width: 8, height: 8, borderRadius: radius.full, backgroundColor: colors.brand.coral }, pressed: { opacity: 0.72 } });
