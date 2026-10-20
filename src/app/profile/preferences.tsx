import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppScreenContainer, ResponsiveGrid } from '@/components/layout';
import { BackHeader } from '@/components/navigation';
import { SettingsRow } from '@/components/settings';
import { EmptyState, ErrorState, LoadingState } from '@/components/system';
import { AppText, Card, PrimaryButton } from '@/components/ui';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { usePreferences } from '@/hooks/usePreferences';
import type { UserPreferences } from '@/types';

export default function PreferencesScreen() {
  const { data, loading, error, refresh, saving, saveError, saved, save } = usePreferences();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState title="Não foi possível carregar as preferências" description={error} hint="Tente novamente." actionLabel="Tentar novamente" onAction={() => void refresh()} />;
  if (!data || data.length === 0) return <EmptyState title="Nenhuma preferência disponível" description="As configurações ainda não estão disponíveis." hint="Atualize para verificar novamente." actionLabel="Atualizar" onAction={() => void refresh()} />;
  return <PreferencesForm key={data.map((item) => `${item.id}:${item.enabled}`).join('|')} preferences={data} saving={saving} saveError={saveError} saved={saved} save={save} />;
}

function PreferencesForm({ preferences, saving, saveError, saved, save }: {
  preferences: UserPreferences;
  saving: boolean;
  saveError: string | null;
  saved: boolean;
  save: (preferences: UserPreferences) => Promise<void>;
}) {
  const [values, setValues] = useState(() => Object.fromEntries(preferences.map((item) => [item.id, item.enabled])) as Record<string, boolean>);
  const submit = () => save(preferences.map((item) => ({ ...item, enabled: values[item.id] ?? item.enabled })));
  return (
    <AppScreenContainer scroll edges={['top', 'bottom', 'left', 'right']} contentStyle={styles.screen}>
      <BackHeader title="Preferências" />
      <View style={styles.heading}><AppText variant="caption" color={colors.brand.coral}>CONFIGURAÇÕES</AppText><AppText variant="h1">Preferências</AppText><AppText variant="bodyLarge" color={colors.textSecondary}>Ajuste notificações, privacidade e experiência do aplicativo.</AppText></View>
      <Card style={styles.summary}><AppText variant="title">Suas escolhas</AppText><AppText variant="body" color={colors.textSecondary}>{saveError ?? (saved ? 'Preferências salvas.' : 'Você pode revisar quando quiser.')}</AppText></Card>
      <ResponsiveGrid smallPhoneColumns={1} phoneColumns={1} tabletColumns={2} largeTabletColumns={2}>{preferences.map((item) => <SettingsRow key={item.id} icon={item.id === 'notifications' ? 'notifications-outline' : 'shield-checkmark-outline'} title={item.title} description={item.description} active={values[item.id]} onPress={() => setValues((current) => ({ ...current, [item.id]: !current[item.id] }))} />)}</ResponsiveGrid>
      <SettingsRow icon="accessibility-outline" title="Aplicativo" description="Aparência e acessibilidade" onPress={() => undefined} />
      <PrimaryButton label="Salvar preferências" loading={saving} onPress={() => void submit()} />
    </AppScreenContainer>
  );
}
const styles = StyleSheet.create({ screen: { gap: spacing[5] }, heading: { gap: spacing[2] }, summary: { gap: spacing[2], backgroundColor: colors.brand.lightPink } });
