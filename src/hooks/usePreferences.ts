import { useCallback, useState } from 'react';

import { repositories } from '@/repositories';
import type { UserPreferences } from '@/types';

import { useRepositoryQuery } from './useRepositoryQuery';

export function usePreferences() {
  const loader = useCallback(() => repositories.preferences.getPreferences(), []);
  const query = useRepositoryQuery(loader);
  const { setData } = query;
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const save = useCallback(async (preferences: UserPreferences) => {
    setSaving(true);
    setSaveError(null);
    setSaved(false);
    try {
      const updated = await repositories.preferences.updatePreferences(preferences);
      setData(updated);
      setSaved(true);
    } catch (cause) {
      setSaveError(cause instanceof Error ? cause.message : 'Não foi possível salvar as preferências.');
    } finally {
      setSaving(false);
    }
  }, [setData]);

  return { ...query, saving, saveError, saved, save };
}
