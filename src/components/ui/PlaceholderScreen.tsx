import type { ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { BackHeader } from '@/components/navigation/BackHeader';
import { colors } from '@/constants/colors';
import { radius } from '@/constants/radius';
import { spacing } from '@/constants/spacing';

import { AppText } from './AppText';
import { ScreenContainer } from './ScreenContainer';

type PlaceholderScreenProps = {
  title: string;
  description: string;
  icon?: ComponentProps<typeof Ionicons>['name'];
};

export function PlaceholderScreen({ title, description, icon = 'construct-outline' }: PlaceholderScreenProps) {
  return (
    <ScreenContainer contentStyle={styles.screen} edges={['top', 'bottom', 'left', 'right']}>
      <BackHeader title={title} />
      <View style={styles.state}>
        <View style={styles.icon}><Ionicons name={icon} size={32} color={colors.text} /></View>
        <AppText variant="h2" align="center">{title}</AppText>
        <AppText variant="body" color={colors.textSecondary} align="center">{description}</AppText>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: { gap: spacing[5] },
  state: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing[3] },
  icon: { width: 64, height: 64, borderRadius: radius.full, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.brand.lightPink },
});
