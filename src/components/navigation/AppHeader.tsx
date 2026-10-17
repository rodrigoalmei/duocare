import { StyleSheet, View, type ImageSourcePropType } from 'react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

import { AppText } from '../ui/AppText';
import { Avatar } from '../ui/Avatar';
import { IconButton } from '../ui/IconButton';

type AppHeaderProps = {
  title: string;
  subtitle?: string;
  avatar?: ImageSourcePropType;
  avatarLabel?: string;
  actionIcon?: 'notifications-outline' | 'settings-outline' | 'ellipsis-horizontal';
  actionLabel?: string;
  onActionPress?: () => void;
};

export function AppHeader({
  title,
  subtitle,
  avatar,
  avatarLabel = 'Foto de perfil',
  actionIcon,
  actionLabel = 'Ação',
  onActionPress,
}: AppHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.identity}>
        {avatar ? <Avatar source={avatar} label={avatarLabel} /> : null}
        <View style={styles.copy}>
          <AppText variant="h3">{title}</AppText>
          {subtitle ? (
            <AppText variant="caption" color={colors.textSecondary}>
              {subtitle}
            </AppText>
          ) : null}
        </View>
      </View>
      {actionIcon ? <IconButton icon={actionIcon} label={actionLabel} onPress={onActionPress} /> : null}
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
  copy: { flex: 1, minWidth: 0, gap: spacing[1] },
});
