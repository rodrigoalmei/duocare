import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppScreenContainer } from '@/components/layout';
import { BackHeader } from '@/components/navigation';
import { EmptyState, ErrorState, LoadingState } from '@/components/system';
import { AppText, Card, PrimaryButton, TextField } from '@/components/ui';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { useData } from '@/contexts/DataContext';
import { useResponsive } from '@/hooks/useResponsive';
import type { MotherProfile } from '@/types';

export default function EditProfileScreen() {
  const { isTabletLayout } = useResponsive();
  const { mother, loading, error, refresh, updateMother } = useData();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState title="Não foi possível carregar o perfil" description={error} hint="Tente novamente." actionLabel="Tentar novamente" onAction={() => void refresh()} />;
  if (!mother) return <EmptyState title="Perfil não encontrado" description="Ainda não há dados para editar." hint="Atualize para verificar novamente." actionLabel="Atualizar" onAction={() => void refresh()} />;
  return <EditProfileForm key={mother.id} mother={mother} isTabletLayout={isTabletLayout} updateMother={updateMother} />;
}

function EditProfileForm({ mother, isTabletLayout, updateMother }: {
  mother: MotherProfile;
  isTabletLayout: boolean;
  updateMother: (profile: Partial<MotherProfile>) => Promise<MotherProfile>;
}) {
  const [name, setName] = useState(mother.name);
  const [email, setEmail] = useState(mother.email);
  const [phone, setPhone] = useState(mother.phone ?? '');
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string>();
  const nameError = submitted && name.trim().length < 2 ? 'Informe seu nome.' : undefined;
  const emailError = submitted && !/^\S+@\S+\.\S+$/.test(email) ? 'Informe um e-mail válido.' : undefined;

  const save = async () => {
    setSubmitted(true);
    setSaved(false);
    setSaveError(undefined);
    if (name.trim().length < 2 || !/^\S+@\S+\.\S+$/.test(email)) return;
    setSaving(true);
    try {
      await updateMother({ name: name.trim(), email: email.trim(), phone: phone.trim() });
      setSaved(true);
    } catch (cause) {
      setSaveError(cause instanceof Error ? cause.message : 'Não foi possível salvar as alterações.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppScreenContainer scroll keyboard edges={['top', 'bottom', 'left', 'right']} maxWidth={900} contentStyle={styles.screen}>
      <BackHeader title="Editar perfil" />
      <View style={styles.heading}><AppText variant="caption" color={colors.brand.coral}>PERFIL</AppText><AppText variant="h1">Editar perfil</AppText><AppText variant="bodyLarge" color={colors.textSecondary}>Atualize seus dados e revise as alterações antes de salvar.</AppText></View>
      <View style={[styles.formRow, isTabletLayout && styles.formRowTablet]}><View style={styles.field}><TextField label="Nome completo" value={name} onChangeText={setName} error={nameError} /></View><View style={styles.field}><TextField label="E-mail" value={email} onChangeText={setEmail} error={emailError} keyboardType="email-address" autoCapitalize="none" /></View></View>
      <TextField label="Telefone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <Card style={styles.notice}><AppText variant="label">Feedback de edição</AppText><AppText variant="body" color={colors.textSecondary}>{saveError ?? (saved ? 'Alterações salvas.' : 'Alterações ainda não salvas.')}</AppText></Card>
      <PrimaryButton label="Salvar alterações" loading={saving} onPress={() => void save()} />
    </AppScreenContainer>
  );
}
const styles = StyleSheet.create({ screen: { gap: spacing[5] }, heading: { gap: spacing[2] }, formRow: { gap: spacing[4] }, formRowTablet: { flexDirection: 'row' }, field: { flex: 1, minWidth: 0 }, notice: { gap: spacing[1], backgroundColor: colors.neutral[100] } });
