import { useCallback, useState } from 'react';

import { repositories } from '@/repositories';
import type { WellbeingEntry } from '@/types';

import { useRepositoryQuery } from './useRepositoryQuery';

export function useWellbeing() {
  const loader = useCallback(() => repositories.wellbeing.getOptions(), []);
  const query = useRepositoryQuery(loader);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const save = useCallback(async (entry: Omit<WellbeingEntry, 'id' | 'createdAt'>) => {
    setSaving(true);
    setSaveError(null);
    setSaved(false);
    try {
      const result = await repositories.wellbeing.saveEntry(entry);
      setSaved(true);
      return result;
    } catch (cause) {
      setSaveError(cause instanceof Error ? cause.message : 'Não foi possível salvar o registro.');
      return undefined;
    } finally {
      setSaving(false);
    }
  }, []);

  return { ...query, saving, saveError, saved, save };
}
