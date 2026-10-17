import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';

import { BackHeader } from '@/components/navigation';
import { AppText, PrimaryButton, ScreenContainer, TextField } from '@/components/ui';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

export default function BabySetupScreen() {
  const router = useRouter();
  return (
    <ScreenContainer scroll keyboard edges={['top', 'bottom', 'left', 'right']} contentStyle={{ gap: spacing[4] }}>
      <BackHeader title="Dados do bebê" />
      <AppText variant="h1">Dados do bebê</AppText>
      <AppText variant="body" color={colors.textSecondary}>Organize as informações principais em um espaço dedicado.</AppText>
      <TextField label="Nome" placeholder="Nome do bebê" />
      <TextField label="Data de nascimento" placeholder="DD/MM/AAAA" keyboardType="numbers-and-punctuation" />
      <PrimaryButton label="Salvar e continuar" onPress={() => router.replace('/home' as Href)} />
    </ScreenContainer>
  );
}
