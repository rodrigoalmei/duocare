import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { colors } from '@/constants/colors';
import { radius } from '@/constants/radius';
import { spacing } from '@/constants/spacing';
import type { WearableDevice } from '@/types';

import { AppText } from '../ui';

export function WearableCard({
  device,
  onPress,
  style,
}: {
  device: WearableDevice;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Dispositivo conectado: ${device.name}`}
      onPress={onPress}
      style={({ pressed }) => [styles.card, style, pressed && styles.pressed]}>
      <View style={styles.iconCircle}>
        <Ionicons name="watch-outline" size={22} color={colors.text} />
      </View>
      <View style={styles.copy}>
        <AppText variant="caption" color={colors.status.info} style={styles.kicker}>
          DISPOSITIVO CONECTADO
        </AppText>
        <AppText variant="title">{device.name}</AppText>
        <AppText variant="caption" color={colors.textSecondary}>
          {device.lastSync}
        </AppText>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { width: '100%', minHeight: 94, flexDirection: 'row', alignItems: 'center', gap: spacing[3], padding: spacing[4], borderRadius: radius.lg, backgroundColor: colors.status.infoSurface },
  iconCircle: { width: 48, height: 48, borderRadius: radius.full, backgroundColor: colors.brand.contrastBlue, alignItems: 'center', justifyContent: 'center' },
  copy: { flex: 1, minWidth: 0, gap: spacing[1] },
  kicker: { fontFamily: 'Inter_600SemiBold' },
  pressed: { opacity: 0.78 },
});
