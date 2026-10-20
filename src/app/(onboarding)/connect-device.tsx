import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, View } from 'react-native';

import { ResponsiveGrid } from '@/components/layout';
import { BackHeader } from '@/components/navigation';
import { SettingsRow } from '@/components/settings';
import { EmptyState, ErrorState, LoadingState } from '@/components/system';
import { AppText, PrimaryButton, ScreenContainer, TextButton } from '@/components/ui';
import { colors } from '@/constants/colors';
import { radius } from '@/constants/radius';
import { spacing } from '@/constants/spacing';
import { useDevices } from '@/hooks/useDevices';

export default function ConnectDeviceScreen() {
  const router = useRouter();
  const { data, loading, error, refresh } = useDevices();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState title="Não foi possível carregar as opções" description={error} hint="Tente novamente." actionLabel="Tentar novamente" onAction={() => void refresh()} />;
  if (!data || data.options.length === 0) return <EmptyState title="Nenhuma opção disponível" description="As conexões ainda não estão disponíveis." hint="Atualize para verificar novamente." actionLabel="Atualizar" onAction={() => void refresh()} />;
  return (
    <ScreenContainer scroll maxWidth={900} edges={['top', 'bottom', 'left', 'right']} contentStyle={styles.screen}>
      <BackHeader title="Conectar dispositivo" />
      <View style={styles.heading}><AppText variant="caption" color={colors.brand.coral}>ETAPA 4 DE 4</AppText><AppText variant="h1">Conecte um dispositivo</AppText><AppText variant="bodyLarge" color={colors.textSecondary}>Escolha uma fonte de dados. As integrações abaixo são apenas demonstrativas.</AppText></View>
      <Image source={require('@/assets/illustrations/wearable-health-hero.png')} accessibilityLabel="Dispositivo wearable demonstrativo" resizeMode="cover" style={styles.image} />
      <ResponsiveGrid smallPhoneColumns={1} phoneColumns={1} tabletColumns={2} largeTabletColumns={3}>
        {data.options.map((item) => <SettingsRow key={item.id} icon="watch-outline" title={item.name} description={item.status} trailingLabel={item.canConnect ? 'Conectar' : undefined} onPress={item.canConnect ? () => router.push('/(onboarding)/device-connected' as Href) : undefined} />)}
      </ResponsiveGrid>
      <PrimaryButton label="Continuar sem conectar" onPress={() => router.replace('/home' as Href)} />
      <TextButton label="Voltar" onPress={() => router.back()} />
    </ScreenContainer>
  );
}
const styles = StyleSheet.create({ screen: { gap: spacing[4] }, heading: { gap: spacing[2] }, image: { width: '100%', height: 220, borderRadius: radius.xl } });
