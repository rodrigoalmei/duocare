import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { AppText, Avatar, ScreenContainer } from '@/components/ui';
import { colors } from '@/constants/colors';
import { radius } from '@/constants/radius';
import { spacing } from '@/constants/spacing';
import { motherMock } from '@/mocks/mother.mock';

const options = [
  { icon: 'person-circle-outline' as const, title: 'Conta', subtitle: 'Dados pessoais e acesso' },
  { icon: 'heart-outline' as const, title: 'Família', subtitle: 'Dados do bebê' },
  { icon: 'watch-outline' as const, title: 'Dispositivos', subtitle: 'Conexões e sincronização' },
  { icon: 'options-outline' as const, title: 'Aplicativo', subtitle: 'Preferências e feedback' },
  { icon: 'help-circle-outline' as const, title: 'Suporte', subtitle: 'Ajuda e perguntas frequentes' },
];

export default function ProfileScreen() {
  const router = useRouter();
  return (
    <ScreenContainer scroll contentStyle={styles.screen}>
      <View style={styles.heading}>
        <AppText variant="caption" color={colors.brand.coral}>PERFIL</AppText>
        <AppText variant="h1">Seu perfil</AppText>
      </View>
      <View style={styles.profileCard}>
        <Avatar source={motherMock.avatar} size={64} label="Foto da usuária" />
        <View style={styles.profileCopy}>
          <AppText variant="title">Nome da usuária</AppText>
          <AppText variant="body" color={colors.textSecondary}>{motherMock.email}</AppText>
        </View>
      </View>
      <AppText variant="h3">Configurações</AppText>
      <View style={styles.list}>
        {options.map((option) => (
          <Pressable key={option.title} accessibilityRole="button" accessibilityLabel={option.title} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
            <View style={styles.rowIcon}><Ionicons name={option.icon} size={20} color={colors.text} /></View>
            <View style={styles.rowCopy}><AppText variant="label">{option.title}</AppText><AppText variant="caption" color={colors.textSecondary}>{option.subtitle}</AppText></View>
            <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
          </Pressable>
        ))}
      </View>
      <Pressable accessibilityRole="button" onPress={() => router.replace('/(auth)/login' as Href)} style={styles.logout}>
        <Ionicons name="log-out-outline" size={20} color={colors.status.error} />
        <AppText variant="label" color={colors.status.error}>Sair</AppText>
      </Pressable>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: { paddingTop: spacing[5], gap: spacing[4] },
  heading: { gap: spacing[1] },
  profileCard: { minHeight: 112, flexDirection: 'row', alignItems: 'center', gap: spacing[4], padding: spacing[4], borderRadius: radius.xl, backgroundColor: colors.brand.lightPink },
  profileCopy: { flex: 1, gap: spacing[1] },
  list: { gap: spacing[2] },
  row: { minHeight: 68, flexDirection: 'row', alignItems: 'center', gap: spacing[3], padding: spacing[3], borderRadius: radius.lg, backgroundColor: colors.surface },
  rowIcon: { width: 40, height: 40, borderRadius: radius.full, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.neutral[100] },
  rowCopy: { flex: 1, gap: spacing[1] },
  logout: { minHeight: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing[2] },
  pressed: { opacity: 0.72 },
});
