import { StyleSheet, View, type ImageSourcePropType } from 'react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { useResponsive } from '@/hooks/useResponsive';

import { AppText } from '../ui/AppText';
import { Avatar } from '../ui/Avatar';
import { IconButton } from '../ui/IconButton';

type AppHeaderProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  avatar?: ImageSourcePropType;
  avatarLabel?: string;
  actionIcon?: 'notifications-outline' | 'settings-outline' | 'ellipsis-horizontal';
  actionLabel?: string;
  onActionPress?: () => void;
};

export function AppHeader({
  title,
  subtitle,
  eyebrow,
  avatar,
  avatarLabel = 'Foto de perfil',
  actionIcon,
  actionLabel = 'Ação',
  onActionPress,
}: AppHeaderProps) {
  const { isTabletLayout } = useResponsive();
  return (
    <View style={styles.header}>
      <View style={[styles.identity, isTabletLayout && styles.identityTablet]}>
        {!isTabletLayout && avatar ? <Avatar source={avatar} label={avatarLabel} /> : null}
        <View style={styles.copy}>
          {eyebrow && isTabletLayout ? (
            <AppText variant="caption" color={colors.status.error} style={styles.eyebrow}>
              {eyebrow}
            </AppText>
          ) : null}
          <AppText variant={isTabletLayout ? 'h1' : 'h3'}>{title}</AppText>
          {subtitle ? (
            <AppText variant="caption" color={colors.textSecondary}>
              {subtitle}
            </AppText>
          ) : null}
        </View>
      </View>
      <View style={styles.actions}>
        {actionIcon ? <IconButton icon={actionIcon} label={actionLabel} onPress={onActionPress} /> : null}
        {isTabletLayout && avatar ? <Avatar source={avatar} label={avatarLabel} /> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 64,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing[3],
  },
  identity: { flex: 1, minWidth: 0, flexDirection: 'row', alignItems: 'center', gap: spacing[3] },
  identityTablet: { alignItems: 'flex-start' },
  copy: { flex: 1, minWidth: 0, gap: spacing[1] },
  eyebrow: { fontFamily: 'Inter_600SemiBold' },
  actions: { flexDirection: 'row', alignItems: 'center', gap: spacing[2] },
});
