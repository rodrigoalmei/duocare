import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { BackHeader } from '@/components/navigation';
import { AppText, PrimaryButton, ScreenContainer, TextField } from '@/components/ui';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { useResponsive } from '@/hooks/useResponsive';

export default function MotherSetupScreen() {
  const router = useRouter();
  const { isTabletLayout } = useResponsive();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const nameError = submitted && name.trim().length < 2 ? 'Informe como você prefere ser chamada.' : undefined;
  const emailError = submitted && !/^\S+@\S+\.\S+$/.test(email) ? 'Informe um e-mail válido.' : undefined;
  const next = () => { setSubmitted(true); if (!nameError && /^\S+@\S+\.\S+$/.test(email) && name.trim().length >= 2) router.push('/(onboarding)/baby-setup' as Href); };
  return (
    <ScreenContainer scroll keyboard maxWidth={820} edges={['top', 'bottom', 'left', 'right']} contentStyle={styles.screen}>
      <BackHeader title="Seus dados" />
      <AppText variant="h1">Seus dados</AppText>
      <AppText variant="body" color={colors.textSecondary}>Preencha apenas as informações necessárias para personalizar sua experiência.</AppText>
      <View style={[styles.formRow, isTabletLayout && styles.formRowTablet]}>
        <View style={styles.field}><TextField label="Nome completo" placeholder="Como você prefere ser chamada?" value={name} onChangeText={setName} error={nameError} autoComplete="name" /></View>
        <View style={styles.field}><TextField label="E-mail" placeholder="seuemail@exemplo.com" value={email} onChangeText={setEmail} error={emailError} keyboardType="email-address" autoCapitalize="none" autoComplete="email" /></View>
      </View>
      <TextField label="Telefone" placeholder="(00) 00000-0000" value={phone} onChangeText={setPhone} keyboardType="phone-pad" autoComplete="tel" helperText="Campo demonstrativo; requisitos ainda serão validados." />
      <PrimaryButton label="Salvar e continuar" onPress={next} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({ screen: { gap: spacing[4] }, formRow: { gap: spacing[4] }, formRowTablet: { flexDirection: 'row' }, field: { flex: 1, minWidth: 0 } });
