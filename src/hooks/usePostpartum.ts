import { useCallback } from 'react';

import { repositories } from '@/repositories';

import { useRepositoryQuery } from './useRepositoryQuery';

export function usePostpartum() {
  const loader = useCallback(() => repositories.postpartum.getSummary(), []);
  return useRepositoryQuery(loader);
}
