import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText, PasswordField, PrimaryButton, ScreenContainer, TextButton } from '@/components/ui';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

export default function ResetPasswordScreen() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  return (
    <ScreenContainer scroll keyboard maxWidth={520} edges={['top', 'bottom', 'left', 'right']} contentStyle={styles.content}>
      <View style={styles.heading}>
        <AppText variant="caption" color={colors.brand.coral}>NOVA SENHA</AppText>
        <AppText variant="h1">Crie uma senha segura</AppText>
        <AppText variant="body" color={colors.textSecondary}>Use uma combinação fácil de lembrar e difícil de adivinhar.</AppText>
      </View>
      <PasswordField label="Nova senha" placeholder="Digite a nova senha" value={password} onChangeText={setPassword} />
      <PasswordField label="Confirmação" placeholder="Repita a nova senha" value={confirmation} onChangeText={setConfirmation} />
      <PrimaryButton label="Salvar nova senha" onPress={() => router.replace('/(auth)/login' as Href)} />
      <TextButton label="Cancelar" onPress={() => router.replace('/(auth)/login' as Href)} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({ content: { paddingTop: spacing[6], gap: spacing[4] }, heading: { gap: spacing[2], marginBottom: spacing[2] } });
