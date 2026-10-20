import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { BackHeader } from '@/components/navigation';
import { AppText, PrimaryButton, ScreenContainer, TextField } from '@/components/ui';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { useResponsive } from '@/hooks/useResponsive';

export default function BabySetupScreen() {
  const router = useRouter();
  const { isTabletLayout } = useResponsive();
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const nameError = submitted && name.trim().length < 2 ? 'Informe o nome do bebê.' : undefined;
  const birthError = submitted && birthDate.length < 8 ? 'Use o formato DD/MM/AAAA.' : undefined;
  const next = () => { setSubmitted(true); if (name.trim().length >= 2 && birthDate.length >= 8) router.push('/(onboarding)/consents' as Href); };
  return (
    <ScreenContainer scroll keyboard maxWidth={820} edges={['top', 'bottom', 'left', 'right']} contentStyle={styles.screen}>
      <BackHeader title="Dados do bebê" />
      <AppText variant="h1">Dados do bebê</AppText>
      <AppText variant="body" color={colors.textSecondary}>Organize as informações principais em um espaço dedicado.</AppText>
      <View style={[styles.formRow, isTabletLayout && styles.formRowTablet]}>
        <View style={styles.field}><TextField label="Nome" placeholder="Nome do bebê" value={name} onChangeText={setName} error={nameError} /></View>
        <View style={styles.field}><TextField label="Data de nascimento" placeholder="DD/MM/AAAA" value={birthDate} onChangeText={setBirthDate} error={birthError} keyboardType="numbers-and-punctuation" /></View>
      </View>
      <TextField label="Informações adicionais" placeholder="Campos sujeitos à validação" helperText="Nenhuma informação clínica é obrigatória nesta demonstração." multiline />
      <PrimaryButton label="Salvar e continuar" onPress={next} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({ screen: { gap: spacing[4] }, formRow: { gap: spacing[4] }, formRowTablet: { flexDirection: 'row' }, field: { flex: 1, minWidth: 0 } });
