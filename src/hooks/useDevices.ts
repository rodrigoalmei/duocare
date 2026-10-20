import { useCallback } from 'react';

import { repositories } from '@/repositories';

import { useRepositoryQuery } from './useRepositoryQuery';

export function useDevices() {
  const loader = useCallback(async () => {
    const [connected, options] = await Promise.all([
      repositories.devices.getConnectedDevice(),
      repositories.devices.listAvailableDevices(),
    ]);
    return { connected, options };
  }, []);
  return useRepositoryQuery(loader);
}
