import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { AppText, BrandPill, PasswordField, PrimaryButton, ScreenContainer, TextButton, TextField } from '@/components/ui';
import { colors } from '@/constants/colors';
import { radius } from '@/constants/radius';
import { spacing } from '@/constants/spacing';

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [accepted, setAccepted] = useState(false);

  return (
    <ScreenContainer scroll keyboard maxWidth={520} edges={['top', 'bottom', 'left', 'right']} contentStyle={styles.content}>
      <View style={styles.topRow}>
        <BrandPill />
        <View style={styles.step}><AppText variant="caption">ETAPA 1 DE 3</AppText></View>
      </View>
      <View style={styles.heading}>
        <AppText variant="h1">Criar sua conta</AppText>
        <AppText variant="bodyLarge" color={colors.textSecondary}>Comece seu acompanhamento de forma simples e segura.</AppText>
      </View>
      <View style={styles.form}>
        <TextField label="Nome completo" placeholder="Como você prefere ser chamada?" value={name} onChangeText={setName} autoComplete="name" />
        <TextField label="E-mail" placeholder="seuemail@exemplo.com" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" autoComplete="email" />
        <PasswordField label="Senha" placeholder="Crie uma senha segura" value={password} onChangeText={setPassword} autoComplete="new-password" />
        <PasswordField label="Confirmar senha" placeholder="Digite novamente" value={confirmation} onChangeText={setConfirmation} autoComplete="new-password" />
        <Pressable
          accessibilityRole="checkbox"
          accessibilityState={{ checked: accepted }}
          accessibilityLabel="Concordo com os Termos de Uso e a Política de Privacidade"
          onPress={() => setAccepted((current) => !current)}
          style={({ pressed }) => [styles.consent, pressed && styles.pressed]}>
          <View style={[styles.checkbox, accepted && styles.checkboxSelected]}>
            {accepted ? <Ionicons name="checkmark" size={18} color={colors.text} /> : null}
          </View>
          <AppText variant="caption" color={colors.textSecondary} style={styles.consentText}>
            Li e concordo com os Termos de Uso e a Política de Privacidade.
          </AppText>
        </Pressable>
      </View>
      <View style={styles.actions}>
        <PrimaryButton label="Criar conta" disabled={!accepted} onPress={() => router.replace('/(onboarding)/setup' as Href)} />
        <TextButton label="Já tenho uma conta" onPress={() => router.replace('/(auth)/login' as Href)} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: spacing[5], gap: spacing[5] },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing[3] },
  step: { paddingHorizontal: spacing[3], paddingVertical: spacing[2], borderRadius: radius.full, backgroundColor: colors.neutral[100] },
  heading: { gap: spacing[2] },
  form: { gap: spacing[3] },
  consent: { minHeight: 56, flexDirection: 'row', alignItems: 'center', gap: spacing[3], padding: spacing[3], borderRadius: radius.md, backgroundColor: '#FFF8F6' },
  checkbox: { width: 24, height: 24, borderRadius: 6, borderWidth: 1, borderColor: colors.brand.coral, alignItems: 'center', justifyContent: 'center' },
  checkboxSelected: { backgroundColor: colors.brand.lightPink },
  consentText: { flex: 1 },
  pressed: { opacity: 0.72 },
  actions: { gap: spacing[2], marginTop: 'auto' },
});
