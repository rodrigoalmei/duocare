import { StyleSheet, View } from 'react-native';

import { StatusCard } from '@/components/cards';
import { AppText, PrimaryButton, ScreenContainer } from '@/components/ui';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { alertsMock } from '@/mocks/alerts.mock';

export default function AlertsScreen() {
  return (
    <ScreenContainer scroll contentStyle={styles.screen}>
      <View style={styles.heading}>
        <AppText variant="caption" color={colors.brand.coral}>ATUALIZAÇÕES</AppText>
        <AppText variant="h1">Alertas</AppText>
        <AppText variant="body" color={colors.textSecondary}>Avisos organizados por categoria, origem e estado de leitura.</AppText>
      </View>
      <StatusCard icon="notifications-outline" title={`${alertsMock.length} novo aviso`} description="Demonstração · sem classificação clínica" tone="warning" />
      {alertsMock.map((alert) => <StatusCard key={alert.id} icon="sync-outline" title={alert.title} description={`${alert.description} · ${alert.createdAt}`} tone="info" />)}
      <PrimaryButton label="Marcar como lidos" />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({ screen: { paddingTop: spacing[5], gap: spacing[4] }, heading: { gap: spacing[1] } });
