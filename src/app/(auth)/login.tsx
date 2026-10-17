import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import {
  AppText,
  BrandPill,
  PasswordField,
  PrimaryButton,
  ScreenContainer,
  TextButton,
  TextField,
} from '@/components/ui';
import { colors } from '@/constants/colors';
import { radius } from '@/constants/radius';
import { spacing } from '@/constants/spacing';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace('/home' as Href);
    }, 450);
  };

  return (
    <ScreenContainer scroll keyboard maxWidth={520} edges={['top', 'bottom', 'left', 'right']} contentStyle={styles.content}>
      <BrandPill />
      <View style={styles.heading}>
        <AppText variant="h1">Bem-vinda!</AppText>
        <AppText variant="bodyLarge" color={colors.textSecondary}>
          Entre para acompanhar você e o seu bebê com cuidado e clareza.
        </AppText>
      </View>

      <View style={styles.form}>
        <TextField
          label="E-mail"
          placeholder="seuemail@exemplo.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          returnKeyType="next"
          leftIcon={<Ionicons name="at" size={20} color={colors.textSecondary} />}
        />
        <PasswordField
          label="Senha"
          placeholder="Digite sua senha"
          value={password}
          onChangeText={setPassword}
          autoComplete="current-password"
          returnKeyType="done"
          onSubmitEditing={handleLogin}
          leftIcon={<Ionicons name="lock-closed-outline" size={20} color={colors.textSecondary} />}
        />
        <View style={styles.forgot}>
          <TextButton label="Esqueci minha senha" onPress={() => router.push('/(auth)/forgot-password' as Href)} />
        </View>
        <PrimaryButton label="Entrar" loading={loading} onPress={handleLogin} accessibilityHint="Abre a Home demonstrativa" />
        <View style={styles.signupRow}>
          <AppText variant="body" color={colors.textSecondary}>Ainda não tem conta?</AppText>
          <TextButton label="Criar conta" onPress={() => router.push('/(auth)/register' as Href)} />
        </View>
      </View>

      <View style={styles.notice}>
        <View style={styles.noticeIcon}><Ionicons name="shield-checkmark-outline" size={20} color={colors.text} /></View>
        <AppText variant="caption" color={colors.textSecondary} style={styles.noticeText}>
          Seus dados são protegidos conforme os consentimentos.
        </AppText>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: spacing[6], gap: spacing[5] },
  heading: { gap: spacing[3] },
  form: { gap: spacing[4] },
  forgot: { alignItems: 'flex-end', marginTop: -spacing[2] },
  signupRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: spacing[1] },
  notice: { width: '100%', flexDirection: 'row', alignItems: 'center', gap: spacing[3], padding: spacing[3], borderRadius: radius.md, backgroundColor: colors.neutral[100] },
  noticeIcon: { width: 36, height: 36, borderRadius: radius.full, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  noticeText: { flex: 1 },
});
