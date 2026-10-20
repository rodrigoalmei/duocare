import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { BabySummaryCard } from '@/components/baby';
import { AppScreenContainer } from '@/components/layout';
import { BackHeader } from '@/components/navigation';
import { EmptyState, ErrorState, LoadingState } from '@/components/system';
import { AppText, Card, PrimaryButton, TextField } from '@/components/ui';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { useData } from '@/contexts/DataContext';
import { useResponsive } from '@/hooks/useResponsive';
import type { BabyProfile } from '@/types';

export default function EditBabyScreen() {
  const { isTabletLayout } = useResponsive();
  const { baby, loading, error, refresh, updateBaby } = useData();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState title="Não foi possível carregar os dados do bebê" description={error} hint="Tente novamente." actionLabel="Tentar novamente" onAction={() => void refresh()} />;
  if (!baby) return <EmptyState title="Dados do bebê não encontrados" description="Ainda não há dados para editar." hint="Atualize para verificar novamente." actionLabel="Atualizar" onAction={() => void refresh()} />;
  return <EditBabyForm key={baby.id} baby={baby} isTabletLayout={isTabletLayout} updateBaby={updateBaby} />;
}

function EditBabyForm({ baby, isTabletLayout, updateBaby }: {
  baby: BabyProfile;
  isTabletLayout: boolean;
  updateBaby: (profile: Partial<BabyProfile>) => Promise<BabyProfile>;
}) {
  const [name, setName] = useState(baby.name);
  const [date, setDate] = useState(baby.birthDate ?? '');
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string>();

  const save = async () => {
    setSubmitted(true);
    setSaved(false);
    setSaveError(undefined);
    if (name.trim().length < 2 || date.length < 8) return;
    setSaving(true);
    try {
      await updateBaby({ name: name.trim(), birthDate: date.trim() });
      setSaved(true);
    } catch (cause) {
      setSaveError(cause instanceof Error ? cause.message : 'Não foi possível salvar as alterações.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppScreenContainer scroll keyboard edges={['top', 'bottom', 'left', 'right']} maxWidth={900} contentStyle={styles.screen}>
      <BackHeader title="Editar dados do bebê" />
      <View style={styles.heading}><AppText variant="caption" color={colors.status.warning}>MEU BEBÊ</AppText><AppText variant="h1">Editar dados do bebê</AppText><AppText variant="bodyLarge" color={colors.textSecondary}>Informações agrupadas em um espaço dedicado.</AppText></View>
      <BabySummaryCard baby={baby} />
      <View style={[styles.formRow, isTabletLayout && styles.formRowTablet]}><View style={styles.field}><TextField label="Nome" value={name} onChangeText={setName} error={submitted && name.trim().length < 2 ? 'Informe o nome do bebê.' : undefined} /></View><View style={styles.field}><TextField label="Data de nascimento" placeholder="DD/MM/AAAA" value={date} onChangeText={setDate} error={submitted && date.length < 8 ? 'Use o formato DD/MM/AAAA.' : undefined} keyboardType="numbers-and-punctuation" /></View></View>
      <TextField label="Informações adicionais" placeholder="Campos sujeitos à validação" helperText="Nenhuma classificação clínica será gerada." multiline />
      <Card style={styles.notice}><AppText variant="label">Feedback de edição</AppText><AppText variant="body" color={colors.textSecondary}>{saveError ?? (saved ? 'Alterações salvas.' : 'Alterações ainda não salvas.')}</AppText></Card>
      <PrimaryButton label="Salvar alterações" loading={saving} onPress={() => void save()} />
    </AppScreenContainer>
  );
}
const styles = StyleSheet.create({ screen: { gap: spacing[5] }, heading: { gap: spacing[2] }, formRow: { gap: spacing[4] }, formRowTablet: { flexDirection: 'row' }, field: { flex: 1, minWidth: 0 }, notice: { gap: spacing[1], backgroundColor: colors.neutral[100] } });
