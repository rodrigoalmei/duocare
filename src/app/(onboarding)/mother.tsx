import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';

import { BackHeader } from '@/components/navigation';
import { AppText, PrimaryButton, ScreenContainer, TextField } from '@/components/ui';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

export default function MotherSetupScreen() {
  const router = useRouter();
  return (
    <ScreenContainer scroll keyboard edges={['top', 'bottom', 'left', 'right']} contentStyle={{ gap: spacing[4] }}>
      <BackHeader title="Seus dados" />
      <AppText variant="h1">Seus dados</AppText>
      <AppText variant="body" color={colors.textSecondary}>Preencha apenas as informações necessárias para personalizar sua experiência.</AppText>
      <TextField label="Nome completo" placeholder="Nome completo" />
      <TextField label="Contato" placeholder="E-mail e telefone" />
      <PrimaryButton label="Salvar e continuar" onPress={() => router.push('/(onboarding)/baby-setup' as Href)} />
    </ScreenContainer>
  );
}
