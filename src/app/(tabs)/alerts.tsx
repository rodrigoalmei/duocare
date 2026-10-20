import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AlertListItem } from '@/components/alerts';
import { StatusCard } from '@/components/cards';
import { ResponsiveGrid } from '@/components/layout';
import { EmptyState, ErrorState, LoadingState } from '@/components/system';
import { AppText, PrimaryButton, ScreenContainer } from '@/components/ui';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { useData } from '@/contexts/DataContext';

export default function AlertsScreen() {
  const router = useRouter();
  const { alerts, loading, error, refresh, markAlertAsRead } = useData();
  const unreadCount = alerts.filter((alert) => !alert.read).length;

  const openAlert = async (id: string, read: boolean) => {
    if (!read) await markAlertAsRead(id);
    router.push(`/alerts/${id}` as Href);
  };

  const markAllAsRead = async () => {
    await Promise.all(alerts.filter((alert) => !alert.read).map((alert) => markAlertAsRead(alert.id)));
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState title="Não foi possível carregar os alertas" description={error} hint="Tente novamente." actionLabel="Tentar novamente" onAction={() => void refresh()} />;
  if (alerts.length === 0) return <EmptyState title="Nenhum alerta no momento" description="Novos avisos aparecerão aqui quando estiverem disponíveis." hint="Atualize para verificar novamente." actionLabel="Atualizar" onAction={() => void refresh()} />;
  return (
    <ScreenContainer scroll contentStyle={styles.screen}>
      <View style={styles.heading}>
        <AppText variant="caption" color={colors.brand.coral}>ATUALIZAÇÕES</AppText>
        <AppText variant="h1">Alertas</AppText>
        <AppText variant="body" color={colors.textSecondary}>Avisos organizados por categoria, origem e estado de leitura.</AppText>
      </View>
      <StatusCard icon="notifications-outline" title={`${unreadCount} novos avisos`} description="Demonstração · sem classificação clínica" tone="warning" />
      <ResponsiveGrid smallPhoneColumns={1} phoneColumns={1} tabletColumns={2} largeTabletColumns={2}>
        {alerts.map((alert) => <AlertListItem key={alert.id} alert={alert} onPress={() => void openAlert(alert.id, alert.read)} />)}
      </ResponsiveGrid>
      <PrimaryButton label="Marcar como lidos" disabled={unreadCount === 0} onPress={() => void markAllAsRead()} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({ screen: { paddingTop: spacing[5], gap: spacing[4] }, heading: { gap: spacing[1] } });
