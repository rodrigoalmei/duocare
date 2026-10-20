import type { ComponentProps } from 'react';
import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { ResponsiveGrid, ScreenContainer } from '@/components/layout';
import { AppHeader } from '@/components/navigation';
import { EmptyState, ErrorState, LoadingState } from '@/components/system';
import { AppText, Avatar } from '@/components/ui';
import { colors } from '@/constants/colors';
import { radius } from '@/constants/radius';
import { spacing } from '@/constants/spacing';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { useResponsive } from '@/hooks/useResponsive';

type ProfileOption = {
  icon: ComponentProps<typeof Ionicons>['name'];
  title: string;
  subtitle: string;
  tone: 'mother' | 'info' | 'baby' | 'neutral';
  route?: Href;
  logout?: boolean;
};

const options: ProfileOption[] = [
  { icon: 'person-circle-outline', title: 'Conta', subtitle: 'Dados pessoais, segurança e preferências.', tone: 'mother', route: '/profile/edit' as Href },
  { icon: 'happy-outline', title: 'Família', subtitle: 'Dados do bebê.', tone: 'baby', route: '/profile/baby' as Href },
  { icon: 'watch-outline', title: 'Dispositivos', subtitle: 'Gerencie wearables e permissões.', tone: 'info', route: '/devices' as Href },
  { icon: 'shield-checkmark-outline', title: 'Privacidade e consentimento', subtitle: 'Revise permissões, compartilhamentos e documentos.', tone: 'neutral', route: '/profile/preferences' as Href },
  { icon: 'options-outline', title: 'Preferências', subtitle: 'Notificações e experiência do aplicativo.', tone: 'neutral', route: '/profile/preferences' as Href },
  { icon: 'chatbubble-ellipses-outline', title: 'Feedback', subtitle: 'Conte como foi sua experiência.', tone: 'mother', route: '/feedback' as Href },
  { icon: 'help-circle-outline', title: 'Ajuda e suporte', subtitle: 'Acesse dúvidas frequentes e canais de atendimento.', tone: 'baby', route: '/support' as Href },
  { icon: 'log-out-outline', title: 'Sessão', subtitle: 'Sair da conta com segurança.', tone: 'neutral', logout: true },
];

const toneStyles = {
  mother: { backgroundColor: colors.brand.lightPink, borderColor: colors.brand.coral },
  info: { backgroundColor: colors.status.infoSurface, borderColor: '#4CCAD5' },
  baby: { backgroundColor: '#FFF2DC', borderColor: '#E29A3B' },
  neutral: { backgroundColor: colors.neutral[100], borderColor: colors.neutral[700] },
};

export default function ProfileScreen() {
  const router = useRouter();
  const { signOut } = useAuth();
  const { mother, loading, error, refresh } = useData();
  const { isTabletLayout } = useResponsive();

  const onOptionPress = async (option: ProfileOption) => {
    if (option.logout) {
      await signOut();
      router.replace('/(auth)/login' as Href);
      return;
    }
    if (option.route) router.push(option.route);
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState title="Não foi possível carregar o perfil" description={error} hint="Tente novamente." actionLabel="Tentar novamente" onAction={() => void refresh()} />;
  if (!mother) return <EmptyState title="Perfil não encontrado" description="Ainda não há dados de perfil disponíveis." hint="Atualize para verificar novamente." actionLabel="Atualizar" onAction={() => void refresh()} />;

  const renderOption = (option: ProfileOption, compact = false) => (
    <Pressable
      key={option.title}
      accessibilityRole="button"
      accessibilityLabel={option.title}
      onPress={() => void onOptionPress(option)}
      style={({ pressed }) => [
        styles.optionCard,
        compact && styles.optionCardCompact,
        toneStyles[option.tone],
        pressed && styles.pressed,
      ]}>
      <View style={styles.rowIcon}><Ionicons name={option.icon} size={22} color={colors.text} /></View>
      <View style={styles.rowCopy}>
        <AppText variant="label">{option.title}</AppText>
        <AppText variant="body" color={colors.textSecondary}>{option.subtitle}</AppText>
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
    </Pressable>
  );

  return (
    <ScreenContainer scroll contentStyle={styles.screen}>
      <AppHeader
        eyebrow="SUA CONTA"
        title="Perfil"
        subtitle={isTabletLayout ? 'Conta, preferências, privacidade e dispositivos.' : 'Seu perfil e preferências.'}
        avatar={isTabletLayout ? mother.avatar : undefined}
        avatarLabel="Foto da usuária"
      />

      <View style={[styles.topArea, isTabletLayout && styles.topAreaTablet]}>
        <View style={[styles.profileCard, isTabletLayout && styles.profileCardTablet]}>
          <Avatar source={mother.avatar} size={isTabletLayout ? 112 : 64} label="Foto da usuária" />
          <View style={[styles.profileCopy, isTabletLayout && styles.profileCopyTablet]}>
            <AppText variant="title">{mother.name}</AppText>
            <AppText variant="body" color={colors.textSecondary}>{mother.email}</AppText>
          </View>
          {isTabletLayout ? (
            <Pressable accessibilityRole="button" accessibilityLabel="Editar perfil" onPress={() => router.push('/profile/edit' as Href)} style={styles.editButton}>
              <AppText variant="caption" color={colors.surface}>EDITAR PERFIL</AppText>
            </Pressable>
          ) : null}
        </View>

        {isTabletLayout ? (
          <View style={styles.primaryOptions}>
            {options.slice(0, 2).map((option) => renderOption(option, true))}
          </View>
        ) : null}
      </View>

      <View style={styles.section}>
        <AppText variant="h3">Configurações</AppText>
        {isTabletLayout ? (
          <ResponsiveGrid tabletColumns={2} largeTabletColumns={2} gap={spacing[4]} itemStyle={styles.optionGridItem}>
            {options.slice(2).map((option) => renderOption(option))}
          </ResponsiveGrid>
        ) : (
          <View style={styles.optionsList}>{options.map((option) => renderOption(option))}</View>
        )}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: { paddingTop: spacing[2], gap: spacing[5] },
  topArea: { width: '100%', gap: spacing[4] },
  topAreaTablet: { flexDirection: 'row', alignItems: 'stretch', gap: spacing[5] },
  profileCard: {
    minHeight: 112,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[4],
    padding: spacing[4],
    borderRadius: radius.xl,
    backgroundColor: colors.brand.lightPink,
  },
  profileCardTablet: { flex: 0.85, minWidth: 0, minHeight: 340, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: spacing[6], gap: spacing[5] },
  profileCopy: { flex: 1, minWidth: 0, gap: spacing[1] },
  profileCopyTablet: { flex: 0, flexGrow: 0, flexShrink: 0, minHeight: 52, width: '100%', alignItems: 'center', gap: spacing[2] },
  editButton: { minHeight: 40, justifyContent: 'center', paddingHorizontal: spacing[5], borderRadius: radius.full, backgroundColor: colors.brand.coral },
  primaryOptions: { flex: 1.25, minWidth: 0, gap: spacing[5] },
  section: { width: '100%', gap: spacing[3] },
  optionsList: { width: '100%', gap: spacing[4] },
  optionCard: {
    minHeight: 112,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    padding: spacing[4],
    borderLeftWidth: 6,
    borderRadius: radius.lg,
  },
  optionCardCompact: { flex: 1, minHeight: 0 },
  optionGridItem: { minHeight: 132 },
  rowIcon: { width: 44, height: 44, borderRadius: radius.full, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface },
  rowCopy: { flex: 1, minWidth: 0, gap: spacing[2] },
  pressed: { opacity: 0.72 },
});
