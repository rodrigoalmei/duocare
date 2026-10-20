import { useCallback } from 'react';

import { repositories } from '@/repositories';

import { useRepositoryQuery } from './useRepositoryQuery';

export function useBabyDevelopment() {
  const loader = useCallback(() => repositories.development.getDevelopment(), []);
  return useRepositoryQuery(loader);
}

export function useGrowth() {
  const loader = useCallback(() => repositories.growth.getGrowth(), []);
  return useRepositoryQuery(loader);
}
