import type { ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { AppScreenContainer } from '@/components/layout';
import { BackHeader } from '@/components/navigation';
import { AppText, LoadingSkeleton, PrimaryButton } from '@/components/ui';
import { colors } from '@/constants/colors';
import { radius } from '@/constants/radius';
import { spacing } from '@/constants/spacing';

type StateVariant = 'empty' | 'error' | 'offline';

const stateConfig: Record<StateVariant, { eyebrow: string; icon: ComponentProps<typeof Ionicons>['name']; surface: string }> = {
  empty: { eyebrow: 'ESTADO DO SISTEMA', icon: 'file-tray-outline', surface: colors.neutral[100] },
  error: { eyebrow: 'ESTADO DO SISTEMA', icon: 'alert-circle-outline', surface: colors.status.errorSurface },
  offline: { eyebrow: 'SEM CONEXÃO', icon: 'cloud-offline-outline', surface: colors.status.warningSurface },
};

type Props = {
  variant: StateVariant;
  title: string;
  description: string;
  hint: string;
  actionLabel: string;
  onAction?: () => void;
};

export function SystemState({ variant, title, description, hint, actionLabel, onAction }: Props) {
  const config = stateConfig[variant];
  return (
    <AppScreenContainer edges={['top', 'bottom', 'left', 'right']} contentStyle={styles.screen} maxWidth={720}>
      <BackHeader title={title} />
      <View style={[styles.panel, { backgroundColor: config.surface }]}>
        <View style={styles.icon}><Ionicons name={config.icon} size={36} color={colors.text} /></View>
        <AppText variant="caption" color={colors.brand.coral}>{config.eyebrow}</AppText>
        <AppText variant="h1" align="center">{title}</AppText>
        <AppText variant="bodyLarge" color={colors.textSecondary} align="center">{description}</AppText>
        <View style={styles.hint}>
          <AppText variant="label">Próximo passo</AppText>
          <AppText variant="body" color={colors.textSecondary}>{hint}</AppText>
        </View>
        <PrimaryButton label={actionLabel} onPress={onAction} />
      </View>
    </AppScreenContainer>
  );
}

export function EmptyState(props: Omit<Props, 'variant'>) { return <SystemState {...props} variant="empty" />; }
export function ErrorState(props: Omit<Props, 'variant'>) { return <SystemState {...props} variant="error" />; }
export function OfflineState(props: Omit<Props, 'variant'>) { return <SystemState {...props} variant="offline" />; }

export function LoadingState() {
  return (
    <AppScreenContainer edges={['top', 'bottom', 'left', 'right']} contentStyle={styles.loadingScreen} maxWidth={820}>
      <View style={styles.loadingHeading}>
        <AppText variant="caption" color={colors.brand.coral}>CARREGANDO</AppText>
        <AppText variant="h1">Preparando suas informações</AppText>
        <AppText variant="body" color={colors.textSecondary}>Aguarde um momento enquanto organizamos esta tela.</AppText>
      </View>
      <LoadingSkeleton style={styles.heroSkeleton} />
      <View style={styles.skeletonRow}><LoadingSkeleton style={styles.cardSkeleton} /><LoadingSkeleton style={styles.cardSkeleton} /></View>
      <LoadingSkeleton style={styles.listSkeleton} />
    </AppScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: { gap: spacing[5] },
  panel: { flex: 1, width: '100%', maxHeight: 620, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', gap: spacing[4], padding: spacing[6], borderRadius: radius.xl },
  icon: { width: 72, height: 72, alignItems: 'center', justifyContent: 'center', borderRadius: radius.full, backgroundColor: colors.surface },
  hint: { width: '100%', gap: spacing[1], padding: spacing[4], borderRadius: radius.lg, backgroundColor: colors.surface },
  loadingScreen: { gap: spacing[5], paddingTop: spacing[6] },
  loadingHeading: { gap: spacing[2] },
  heroSkeleton: { height: 180, borderRadius: radius.xl },
  skeletonRow: { flexDirection: 'row', gap: spacing[4] },
  cardSkeleton: { flex: 1, height: 108 },
  listSkeleton: { height: 92 },
});
