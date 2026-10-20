import { useCallback } from 'react';

import { repositories } from '@/repositories';
import type { BreastfeedingContent } from '@/types';

import { useRepositoryQuery } from './useRepositoryQuery';

export function useBreastfeedingContent() {
  const loader = useCallback(async (): Promise<BreastfeedingContent | null> => {
    const contents = await repositories.content.listContents();
    return contents.find((item) => item.category.toLocaleUpperCase('pt-BR').includes('AMAMENTAÇÃO')) ?? null;
  }, []);
  return useRepositoryQuery(loader);
}

export function useExercises() {
  const loader = useCallback(() => repositories.exercises.listExercises(), []);
  return useRepositoryQuery(loader);
}
