import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppScreenContainer } from '@/components/layout';
import { BackHeader } from '@/components/navigation';
import { EmptyState, ErrorState, LoadingState } from '@/components/system';
import { AppText, Card, Chip, PrimaryButton, TextField } from '@/components/ui';
import { colors } from '@/constants/colors';
import { radius } from '@/constants/radius';
import { spacing } from '@/constants/spacing';
import { useFeedback } from '@/hooks/useFeedback';
import type { FeedbackOptions } from '@/types';

export default function FeedbackScreen() {
  const { data, loading, error, refresh, submitting, submitError, submitted, submit } = useFeedback();
  if (loading) return <LoadingState />;
  if (error) return <ErrorState title="Não foi possível carregar o feedback" description={error} hint="Tente novamente." actionLabel="Tentar novamente" onAction={() => void refresh()} />;
  if (!data || data.ratings.length === 0 || data.categories.length === 0) return <EmptyState title="Formulário indisponível" description="As opções de feedback ainda não estão disponíveis." hint="Atualize para verificar novamente." actionLabel="Atualizar" onAction={() => void refresh()} />;
  return <FeedbackForm options={data} submitting={submitting} submitError={submitError} submitted={submitted} submit={submit} />;
}

function FeedbackForm({ options, submitting, submitError, submitted, submit }: {
  options: FeedbackOptions;
  submitting: boolean;
  submitError: string | null;
  submitted: boolean;
  submit: (payload: { rating: number; category: string; comment?: string }) => Promise<void>;
}) {
  const [rating, setRating] = useState<number>();
  const [category, setCategory] = useState(options.categories[0]);
  const [comment, setComment] = useState('');
  return (
    <AppScreenContainer scroll keyboard edges={['top', 'bottom', 'left', 'right']} maxWidth={860} contentStyle={styles.screen}>
      <BackHeader title="Feedback" />
      <View style={styles.heading}><AppText variant="caption" color={colors.brand.coral}>SUA EXPERIÊNCIA</AppText><AppText variant="h1">Conte como foi sua experiência</AppText><AppText variant="bodyLarge" color={colors.textSecondary}>Seu retorno ajuda a tornar o DUOCARE mais claro e acolhedor.</AppText></View>
      <Card style={styles.rating}><AppText variant="title">Como foi sua experiência?</AppText><AppText variant="caption" color={colors.textSecondary}>Escolha uma nota para continuar</AppText><View style={styles.scale}>{options.ratings.map((value) => <Pressable key={value} accessibilityRole="button" accessibilityState={{ selected: rating === value }} accessibilityLabel={`Nota ${value}`} onPress={() => setRating(value)} style={[styles.scaleItem, rating === value && styles.scaleSelected]}><AppText variant="h3">{value}</AppText></Pressable>)}</View></Card>
      <View style={styles.section}><AppText variant="label">Categoria</AppText><View style={styles.chips}>{options.categories.map((item) => <Chip key={item} label={item} selected={category === item} onPress={() => setCategory(item)} />)}</View></View>
      <TextField label="Comentário opcional" placeholder="Escreva sua mensagem aqui…" value={comment} onChangeText={setComment} multiline numberOfLines={5} style={styles.textarea} />
      {submitted || submitError ? <Card style={styles.success}><AppText variant="label" color={submitError ? colors.status.error : colors.status.success}>{submitError ? 'Não foi possível enviar' : 'Feedback recebido'}</AppText><AppText variant="body" color={colors.textSecondary}>{submitError ?? 'Obrigado por compartilhar sua experiência demonstrativa.'}</AppText></Card> : null}
      <PrimaryButton label="Enviar feedback" disabled={!rating} loading={submitting} onPress={() => rating ? void submit({ rating, category, comment: comment.trim() || undefined }) : undefined} />
    </AppScreenContainer>
  );
}
const styles = StyleSheet.create({ screen: { gap: spacing[5] }, heading: { gap: spacing[2] }, rating: { gap: spacing[4], backgroundColor: colors.brand.lightPink }, scale: { flexDirection: 'row', gap: spacing[2] }, scaleItem: { flex: 1, minHeight: 52, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface }, scaleSelected: { borderColor: colors.brand.coral, backgroundColor: colors.brand.coral }, section: { gap: spacing[3] }, chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing[2] }, textarea: { minHeight: 112, textAlignVertical: 'top' }, success: { gap: spacing[2], backgroundColor: colors.status.successSurface } });
