import type { Href } from 'expo-router';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { AppScreenContainer } from '@/components/layout';
import { BackHeader } from '@/components/navigation';
import { EmptyState, ErrorState, LoadingState } from '@/components/system';
import { AppText, Card, PrimaryButton } from '@/components/ui';
import { colors } from '@/constants/colors';
import { radius } from '@/constants/radius';
import { spacing } from '@/constants/spacing';
import { useData } from '@/contexts/DataContext';

export default function AlertDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { alerts, loading, error, refresh } = useData();
  const alert = alerts.find((item) => item.id === id);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState title="Não foi possível carregar o alerta" description={error} hint="Tente novamente." actionLabel="Tentar novamente" onAction={() => void refresh()} />;
  if (!alert) return <EmptyState title="Alerta não encontrado" description="Este aviso não está mais disponível." hint="Volte à central de alertas." actionLabel="Atualizar" onAction={() => void refresh()} />;
  return (
    <AppScreenContainer scroll edges={['top', 'bottom', 'left', 'right']} maxWidth={820} contentStyle={styles.screen}>
      <BackHeader title="Detalhe do alerta" />
      <View style={styles.heading}><AppText variant="caption" color={colors.brand.coral}>ALERTA · {alert.source.toUpperCase()}</AppText><AppText variant="h1">Detalhe do alerta</AppText><AppText variant="bodyLarge" color={colors.textSecondary}>Informação contextual sem recomendação clínica.</AppText></View>
      <Card style={styles.hero}><View style={styles.icon}><Ionicons name="information-circle-outline" size={32} color={colors.text} /></View><View style={styles.copy}><AppText variant="h2">{alert.title}</AppText><AppText variant="caption" color={colors.textSecondary}>{alert.createdAt} · origem demonstrativa</AppText></View></Card>
      <Card style={styles.section}><AppText variant="title">O que aconteceu</AppText><AppText variant="bodyLarge" color={colors.textSecondary}>{alert.description}</AppText></Card>
      <Card style={styles.section}><AppText variant="title">Sobre este aviso</AppText><AppText variant="bodyLarge" color={colors.textSecondary}>Mensagem neutra; regras e relevância ainda serão validadas.</AppText></Card>
      <PrimaryButton label="Ver dados relacionados" onPress={() => router.push('/health/history' as Href)} />
    </AppScreenContainer>
  );
}
const styles = StyleSheet.create({ screen: { gap: spacing[5] }, heading: { gap: spacing[2] }, hero: { minHeight: 160, flexDirection: 'row', alignItems: 'center', gap: spacing[4], backgroundColor: colors.status.infoSurface }, icon: { width: 64, height: 64, alignItems: 'center', justifyContent: 'center', borderRadius: radius.full, backgroundColor: colors.surface }, copy: { flex: 1, minWidth: 0, gap: spacing[2] }, section: { gap: spacing[3] } });
