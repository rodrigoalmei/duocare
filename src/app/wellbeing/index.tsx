import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppScreenContainer } from '@/components/layout';
import { BackHeader } from '@/components/navigation';
import { EmptyState, ErrorState, LoadingState } from '@/components/system';
import { AppText, Card, Chip, PrimaryButton, TextField } from '@/components/ui';
import { colors } from '@/constants/colors';
import { radius } from '@/constants/radius';
import { spacing } from '@/constants/spacing';
import { useWellbeing } from '@/hooks/useWellbeing';
import type { WellbeingOptions } from '@/types';

export default function WellbeingScreen() {
  const { data, loading, error, refresh, saving, saveError, saved, save } = useWellbeing();
  if (loading) return <LoadingState />;
  if (error) return <ErrorState title="Não foi possível carregar o bem-estar" description={error} hint="Tente novamente." actionLabel="Tentar novamente" onAction={() => void refresh()} />;
  if (!data || data.ratings.length === 0 || data.periods.length === 0) return <EmptyState title="Opções indisponíveis" description="Ainda não há opções para este registro." hint="Atualize para verificar novamente." actionLabel="Atualizar" onAction={() => void refresh()} />;
  return <WellbeingForm options={data} saving={saving} saveError={saveError} saved={saved} save={save} />;
}

function WellbeingForm({ options, saving, saveError, saved, save }: {
  options: WellbeingOptions;
  saving: boolean;
  saveError: string | null;
  saved: boolean;
  save: (entry: { rating: number; period: string; comment?: string }) => Promise<unknown>;
}) {
  const [rating, setRating] = useState<number>();
  const [period, setPeriod] = useState(options.periods[0]);
  const [comment, setComment] = useState('');
  return (
    <AppScreenContainer scroll keyboard edges={['top', 'bottom', 'left', 'right']} maxWidth={820} contentStyle={styles.screen}>
      <BackHeader title="Dor e bem-estar" />
      <View style={styles.heading}><AppText variant="caption" color={colors.brand.coral}>BEM-ESTAR</AppText><AppText variant="h1">Como você está hoje?</AppText><AppText variant="bodyLarge" color={colors.textSecondary}>Registre sua percepção sem diagnóstico ou julgamento.</AppText></View>
      <Card style={styles.ratingCard}><AppText variant="title">Como você percebe seu bem-estar?</AppText><AppText variant="caption" color={colors.textSecondary}>Escolha um ponto — registro pessoal demonstrativo</AppText><View style={styles.scale}>{options.ratings.map((value) => <Pressable key={value} accessibilityRole="button" accessibilityState={{ selected: rating === value }} onPress={() => setRating(value)} style={[styles.scaleItem, rating === value && styles.scaleItemSelected]}><AppText variant="label">{value}</AppText></Pressable>)}</View><View style={styles.legend}><AppText variant="caption">Mais confortável</AppText><AppText variant="caption">Mais difícil</AppText></View></Card>
      <View style={styles.chips}>{options.periods.map((item) => <Chip key={item} label={item} selected={period === item} onPress={() => setPeriod(item)} />)}</View>
      <TextField label="Comentário opcional" placeholder="Escreva algo que ajude a contextualizar seu registro." value={comment} onChangeText={setComment} multiline numberOfLines={4} style={styles.textarea} />
      <Card style={styles.privacy}><AppText variant="label">Privacidade</AppText><AppText variant="body" color={colors.textSecondary}>{saveError ?? (saved ? 'Registro salvo.' : 'Você poderá revisar antes de salvar.')}</AppText></Card>
      <PrimaryButton label="Salvar registro" disabled={!rating} loading={saving} onPress={() => rating ? void save({ rating, period, comment: comment.trim() || undefined }) : undefined} />
    </AppScreenContainer>
  );
}
const styles = StyleSheet.create({ screen: { gap: spacing[5] }, heading: { gap: spacing[2] }, ratingCard: { gap: spacing[4], backgroundColor: colors.brand.lightPink }, scale: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing[2] }, scaleItem: { flex: 1, maxWidth: 64, minHeight: 48, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface }, scaleItemSelected: { borderColor: colors.brand.coral, backgroundColor: colors.brand.coral }, legend: { flexDirection: 'row', justifyContent: 'space-between' }, chips: { flexDirection: 'row', gap: spacing[2] }, textarea: { minHeight: 96, textAlignVertical: 'top' }, privacy: { gap: spacing[1], backgroundColor: colors.neutral[100] } });
