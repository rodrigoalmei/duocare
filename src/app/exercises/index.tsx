import { Image, StyleSheet, View } from 'react-native';

import { AppScreenContainer, ResponsiveGrid } from '@/components/layout';
import { BackHeader } from '@/components/navigation';
import { EmptyState, ErrorState, LoadingState } from '@/components/system';
import { AppText, Card, Chip, PrimaryButton } from '@/components/ui';
import { colors } from '@/constants/colors';
import { radius } from '@/constants/radius';
import { spacing } from '@/constants/spacing';
import { useExercises } from '@/hooks/useContentDomains';
import { useResponsive } from '@/hooks/useResponsive';

export default function ExercisesScreen() {
  const { isTabletLayout } = useResponsive();
  const { data: activities, loading, error, refresh } = useExercises();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState title="Não foi possível carregar os exercícios" description={error} hint="Tente novamente." actionLabel="Tentar novamente" onAction={() => void refresh()} />;
  if (!activities || activities.length === 0) return <EmptyState title="Nenhum exercício disponível" description="As atividades ainda aguardam validação." hint="Atualize para verificar novamente." actionLabel="Atualizar" onAction={() => void refresh()} />;

  return (
    <AppScreenContainer scroll edges={['top', 'bottom', 'left', 'right']} contentStyle={styles.screen}>
      <BackHeader title="Exercícios" />
      <View style={styles.heading}><AppText variant="caption" color={colors.brand.coral}>MINHA SAÚDE</AppText><AppText variant="h1">Exercícios</AppText><AppText variant="bodyLarge" color={colors.textSecondary}>Estrutura visual para atividades futuras, sem prescrição.</AppText></View>
      <View style={[styles.hero, isTabletLayout && styles.heroTablet]}><Image source={require('@/assets/illustrations/maternal-exercise.png')} accessibilityLabel="Pessoa realizando movimento demonstrativo" resizeMode="cover" style={[styles.image, isTabletLayout && styles.imageTablet]} /><Card style={[styles.heroCard, isTabletLayout && styles.heroCardTablet]}><AppText variant="h3">Práticas</AppText><AppText variant="body" color={colors.textSecondary}>Duração, frequência e progressão são placeholders sujeitos à validação profissional.</AppText></Card></View>
      <View style={styles.chips}><Chip label="Todos" selected /><Chip label="A fazer" /><Chip label="Concluídos" /></View>
      <ResponsiveGrid smallPhoneColumns={1} phoneColumns={1} tabletColumns={2} largeTabletColumns={2}>
        {activities.map((item) => <Card key={item.id} style={styles.activity}><View><AppText variant="caption" color={colors.brand.coral}>{item.statusLabel.toUpperCase()}</AppText><AppText variant="title">{item.title}</AppText></View><AppText variant="body" color={colors.textSecondary}>{item.description}</AppText><PrimaryButton label="Ver atividade" /></Card>)}
      </ResponsiveGrid>
      <Card style={styles.notice}><AppText variant="label">Nota profissional</AppText><AppText variant="body" color={colors.textSecondary}>Nenhuma prática deve ser interpretada como prescrição nesta versão.</AppText></Card>
    </AppScreenContainer>
  );
}
const styles = StyleSheet.create({
  screen: { gap: spacing[5] },
  heading: { gap: spacing[2] },
  hero: { width: '100%', gap: spacing[4] },
  heroTablet: { minHeight: 286, flexDirection: 'row', alignItems: 'stretch', gap: spacing[5] },
  image: { width: '100%', height: 240, borderRadius: radius.xl },
  imageTablet: { flex: 1.65, flexBasis: 0, minWidth: 0, width: 0, height: 286 },
  heroCard: { gap: spacing[2], backgroundColor: colors.brand.lightPink },
  heroCardTablet: { flex: 0.9, flexBasis: 0, minWidth: 0, width: 0, minHeight: 286, justifyContent: 'center', borderLeftWidth: 6, borderLeftColor: colors.brand.coral },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing[2] },
  activity: { minHeight: 210, justifyContent: 'space-between', gap: spacing[3] },
  notice: { gap: spacing[2], backgroundColor: colors.status.warningSurface },
});
