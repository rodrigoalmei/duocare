import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { WearableCard } from '@/components/health';
import { BackHeader } from '@/components/navigation';
import { EmptyState, ErrorState, LoadingState } from '@/components/system';
import { AppText, Card, PrimaryButton, ScreenContainer, TextButton } from '@/components/ui';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { useDevices } from '@/hooks/useDevices';

export default function DeviceConnectedScreen() {
  const router = useRouter();
  const { data, loading, error, refresh } = useDevices();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState title="Não foi possível confirmar o dispositivo" description={error} hint="Tente novamente." actionLabel="Tentar novamente" onAction={() => void refresh()} />;
  if (!data?.connected) return <EmptyState title="Dispositivo não encontrado" description="Nenhuma conexão demonstrativa está ativa." hint="Volte e escolha uma opção." actionLabel="Atualizar" onAction={() => void refresh()} />;
  return (
    <ScreenContainer scroll maxWidth={760} edges={['top', 'bottom', 'left', 'right']} contentStyle={styles.screen}>
      <BackHeader title="Dispositivo conectado" />
      <View style={styles.heading}><AppText variant="caption" color={colors.status.success}>DISPOSITIVO</AppText><AppText variant="h1">Conexão ativa</AppText><AppText variant="bodyLarge" color={colors.textSecondary}>Consulte o status e a sincronização sem interpretação clínica.</AppText></View>
      <WearableCard device={data.connected} />
      <Card style={styles.card}><AppText variant="title">Informações sincronizadas</AppText><AppText variant="body" color={colors.textSecondary}>{data.connected.dataSources?.join(' e ') || 'Fontes demonstrativas'} — exemplos de estrutura.</AppText><AppText variant="caption" color={colors.status.info}>Sincronizar agora · Desconectar</AppText></Card>
      <PrimaryButton label="Concluir configuração" onPress={() => router.replace('/home' as Href)} />
      <TextButton label="Voltar" onPress={() => router.back()} />
    </ScreenContainer>
  );
}
const styles = StyleSheet.create({ screen: { gap: spacing[5] }, heading: { gap: spacing[2] }, card: { gap: spacing[2], backgroundColor: colors.status.infoSurface } });
