import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { BackHeader } from '@/components/navigation';
import { AppText, Card, PrimaryButton, ScreenContainer, TextButton } from '@/components/ui';
import { colors } from '@/constants/colors';
import { radius } from '@/constants/radius';
import { spacing } from '@/constants/spacing';

export default function InitialSetupScreen() {
  const router = useRouter();
  return (
    <ScreenContainer scroll edges={['top', 'bottom', 'left', 'right']} maxWidth={760} contentStyle={styles.screen}>
      <BackHeader title="Configuração inicial" />
      <View style={styles.heading}>
        <AppText variant="caption" color={colors.brand.coral}>CONFIGURAÇÃO · 1 DE 4</AppText>
        <AppText variant="h1">Vamos preparar seu espaço</AppText>
        <AppText variant="bodyLarge" color={colors.textSecondary}>São quatro etapas curtas. Você poderá revisar os dados antes de concluir.</AppText>
      </View>
      <View style={styles.progress} accessibilityLabel="Etapa 1 de 4">
        {[1, 2, 3, 4].map((step) => <View key={step} style={[styles.step, step === 1 && styles.stepActive]}><AppText variant="label">{step}</AppText></View>)}
      </View>
      <Card style={styles.card}>
        <View style={styles.cardIcon}><Ionicons name="person-outline" size={26} color={colors.text} /></View>
        <View style={styles.cardCopy}><AppText variant="caption" color={colors.brand.coral}>AGORA</AppText><AppText variant="h3">Dados da mãe</AppText><AppText variant="body" color={colors.textSecondary}>Depois, dados do bebê, privacidade e dispositivo.</AppText></View>
      </Card>
      <PrimaryButton label="Continuar" onPress={() => router.push('/(onboarding)/mother' as Href)} />
      <TextButton label="Fazer depois" onPress={() => router.replace('/home' as Href)} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: { gap: spacing[5], paddingTop: spacing[2] },
  heading: { gap: spacing[2] },
  progress: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing[2], padding: spacing[3], borderRadius: radius.full, backgroundColor: colors.neutral[100] },
  step: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: radius.full, backgroundColor: colors.surface },
  stepActive: { backgroundColor: colors.brand.coral },
  card: { minHeight: 160, flexDirection: 'row', alignItems: 'center', gap: spacing[4], backgroundColor: colors.brand.lightPink },
  cardIcon: { width: 56, height: 56, alignItems: 'center', justifyContent: 'center', borderRadius: radius.full, backgroundColor: colors.surface },
  cardCopy: { flex: 1, minWidth: 0, gap: spacing[2] },
});
