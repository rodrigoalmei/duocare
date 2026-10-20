import type { WearableDevice } from '@/types';

export const wearableMock: WearableDevice = {
  id: 'wearable-demo-01',
  name: 'Relógio conectado',
  status: 'connected',
  lastSync: 'Última sincronização · demonstrativa',
};

export const wearableOptionsMock = [
  { id: 'apple-health', name: 'Apple Health', status: 'Não conectado' },
  { id: 'garmin', name: 'Garmin', status: 'Não conectado' },
  { id: 'other', name: 'Outro dispositivo', status: 'Disponibilidade a confirmar' },
] as const;
