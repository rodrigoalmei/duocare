import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { AppText, PrimaryButton, ScreenContainer, TextButton, TextField } from '@/components/ui';
import { colors } from '@/constants/colors';
import { radius } from '@/constants/radius';
import { spacing } from '@/constants/spacing';

export default function VerifyEmailScreen() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const codeError = submitted && code.length !== 6 ? 'Digite os seis números do código.' : undefined;
  return (
    <ScreenContainer scroll keyboard maxWidth={520} edges={['top', 'bottom', 'left', 'right']} contentStyle={styles.content}>
      <View style={styles.heading}>
        <AppText variant="caption" color={colors.brand.coral}>SEGURANÇA</AppText>
        <AppText variant="h1">Confira seu e-mail</AppText>
        <AppText variant="body" color={colors.textSecondary}>Enviamos um código de verificação demonstrativo.</AppText>
      </View>
      <View style={styles.codeCard}>
        <Ionicons name="mail-outline" size={36} color={colors.textSecondary} />
        <TextField
          label="Código de verificação"
          placeholder="000000"
          value={code}
          onChangeText={(value) => setCode(value.replace(/\D/g, '').slice(0, 6))}
          error={codeError}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          maxLength={6}
          style={styles.code}
        />
      </View>
      <PrimaryButton label="Verificar" onPress={() => { setSubmitted(true); if (code.length === 6) router.replace('/(auth)/reset-password' as Href); }} />
      <TextButton label="Alterar e-mail" onPress={() => router.back()} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: spacing[6], gap: spacing[5] },
  heading: { gap: spacing[2] },
  codeCard: { minHeight: 160, borderRadius: radius.lg, backgroundColor: colors.brand.lightPink, alignItems: 'center', justifyContent: 'center', gap: spacing[3] },
  code: { letterSpacing: 8, textAlign: 'center', fontSize: 20 },
});
