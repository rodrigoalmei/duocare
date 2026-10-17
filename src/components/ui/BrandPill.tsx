import { StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { colors } from '@/constants/colors';
import { radius } from '@/constants/radius';
import { spacing } from '@/constants/spacing';

import { AppText } from './AppText';

export function BrandPill() {
  return (
    <View style={styles.pill} accessibilityLabel="DUOCARE">
      <Ionicons name="heart-outline" size={22} color={colors.brand.coral} />
      <AppText variant="label">DUOCARE</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: { alignSelf: 'flex-start', minHeight: 42, flexDirection: 'row', alignItems: 'center', gap: spacing[2], paddingHorizontal: spacing[4], borderRadius: radius.full, backgroundColor: colors.brand.lightPink },
});
