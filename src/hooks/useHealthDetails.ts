import { useCallback } from 'react';

import { repositories } from '@/repositories';

import { useRepositoryQuery } from './useRepositoryQuery';

export function useHealthOverview() {
  const loader = useCallback(() => repositories.healthDetails.getOverview(), []);
  return useRepositoryQuery(loader);
}

export function useSleepDetail() {
  const loader = useCallback(() => repositories.healthDetails.getSleepDetail(), []);
  return useRepositoryQuery(loader);
}

export function useStepsDetail() {
  const loader = useCallback(() => repositories.healthDetails.getStepsDetail(), []);
  return useRepositoryQuery(loader);
}

export function useHealthHistory() {
  const loader = useCallback(async () => {
    const [history, overview] = await Promise.all([
      repositories.healthDetails.listHistory(),
      repositories.healthDetails.getOverview(),
    ]);
    return { history, weeklyActivity: overview.weeklyActivity };
  }, []);
  return useRepositoryQuery(loader);
}
