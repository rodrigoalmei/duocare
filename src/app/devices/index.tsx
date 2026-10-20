import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { WearableCard } from '@/components/health';
import { AppScreenContainer, ResponsiveGrid } from '@/components/layout';
import { BackHeader } from '@/components/navigation';
import { SettingsRow } from '@/components/settings';
import { EmptyState, ErrorState, LoadingState } from '@/components/system';
import { AppText, PrimaryButton } from '@/components/ui';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { useDevices } from '@/hooks/useDevices';

export default function DevicesScreen() {
  const router = useRouter();
  const { data, loading, error, refresh } = useDevices();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState title="Não foi possível carregar os dispositivos" description={error} hint="Tente novamente." actionLabel="Tentar novamente" onAction={() => void refresh()} />;
  if (!data) return <EmptyState title="Nenhum dispositivo disponível" description="As opções de conexão ainda não estão disponíveis." hint="Atualize para verificar novamente." actionLabel="Atualizar" onAction={() => void refresh()} />;
  return (
    <AppScreenContainer scroll edges={['top', 'bottom', 'left', 'right']} contentStyle={styles.screen}>
      <BackHeader title="Dispositivos conectados" />
      <View style={styles.heading}><AppText variant="caption" color={colors.status.info}>CONFIGURAÇÕES</AppText><AppText variant="h1">Dispositivos conectados</AppText><AppText variant="bodyLarge" color={colors.textSecondary}>Gerencie conexões e consulte o estado de sincronização.</AppText></View>
      {data.connected ? <WearableCard device={data.connected} /> : null}
      <ResponsiveGrid smallPhoneColumns={1} phoneColumns={1} tabletColumns={2} largeTabletColumns={3}>{data.options.filter((item) => item.canConnect).slice(0, 2).map((item) => <SettingsRow key={item.id} icon="add-circle-outline" title={item.name} description={item.status} onPress={() => router.push('/(onboarding)/connect-device' as Href)} />)}</ResponsiveGrid>
      <PrimaryButton label="Sincronizar agora" />
    </AppScreenContainer>
  );
}
const styles = StyleSheet.create({ screen: { gap: spacing[5] }, heading: { gap: spacing[2] } });
