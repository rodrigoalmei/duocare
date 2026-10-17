import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { BackHeader } from '@/components/navigation';
import { AppText, PrimaryButton, ScreenContainer, TextButton, TextField } from '@/components/ui';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  return (
    <ScreenContainer scroll keyboard maxWidth={520} edges={['top', 'bottom', 'left', 'right']} contentStyle={styles.content}>
      <BackHeader title="Recuperar senha" />
      <View style={styles.heading}>
        <AppText variant="h1">Recupere sua senha</AppText>
        <AppText variant="body" color={colors.textSecondary}>Informe o e-mail da sua conta para receber instruções demonstrativas.</AppText>
      </View>
      <TextField label="E-mail da conta" placeholder="seuemail@exemplo.com" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <PrimaryButton label="Enviar instruções" onPress={() => router.push('/(auth)/verify-email' as Href)} />
      <TextButton label="Voltar ao login" onPress={() => router.replace('/(auth)/login' as Href)} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({ content: { paddingTop: spacing[3], gap: spacing[5] }, heading: { gap: spacing[2] } });
