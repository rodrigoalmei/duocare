import { useCallback } from 'react';

import { repositories } from '@/repositories';

import { useRepositoryQuery } from './useRepositoryQuery';

export function useSupport() {
  const loader = useCallback(() => repositories.support.listTopics(), []);
  return useRepositoryQuery(loader);
}
