import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { BackHeader } from '@/components/navigation';
import { SettingsRow } from '@/components/settings';
import { AppText, PrimaryButton, ScreenContainer } from '@/components/ui';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

export default function ConsentsScreen() {
  const router = useRouter();
  const [appUse, setAppUse] = useState(false);
  const [connectedData, setConnectedData] = useState(false);
  return (
    <ScreenContainer scroll maxWidth={820} edges={['top', 'bottom', 'left', 'right']} contentStyle={styles.screen}>
      <BackHeader title="Privacidade" />
      <View style={styles.heading}><AppText variant="caption" color={colors.brand.coral}>ETAPA 3 DE 4</AppText><AppText variant="h1">Privacidade e consentimentos</AppText><AppText variant="bodyLarge" color={colors.textSecondary}>Revise cada categoria com calma. Nenhuma opção jurídica foi presumida.</AppText></View>
      <SettingsRow icon="apps-outline" title="Uso do aplicativo" description="Preferência a confirmar" active={appUse} onPress={() => setAppUse((value) => !value)} />
      <SettingsRow icon="watch-outline" title="Dados conectados" description="Preferência a confirmar" active={connectedData} onPress={() => setConnectedData((value) => !value)} />
      <SettingsRow icon="document-text-outline" title="Documentos" description="Termos e política de privacidade" onPress={() => undefined} />
      <PrimaryButton label="Confirmar escolhas" onPress={() => router.push('/(onboarding)/connect-device' as Href)} />
    </ScreenContainer>
  );
}
const styles = StyleSheet.create({ screen: { gap: spacing[4] }, heading: { gap: spacing[2], marginBottom: spacing[2] } });
