import type { HealthMetric, WearableDevice } from '@/types';

export const wearableMock: WearableDevice = {
  id: 'wearable-demo-01',
  name: 'Relógio / Exemplo',
  status: 'connected',
  lastSync: 'Última sincronização · demonstrativa',
};

export const healthMetricsMock: HealthMetric[] = [
  { id: 'steps', label: 'Passos', value: '3.240*', period: 'Hoje', tone: 'mother', icon: 'arrow-up' },
  { id: 'sleep', label: 'Sono', value: '6h 40*', period: 'Última noite', tone: 'info', icon: 'moon' },
  { id: 'activity', label: 'Atividade', value: '32 min*', period: 'Hoje', tone: 'baby', icon: 'fitness' },
];

export const weeklyActivityMock = [42, 66, 36, 82, 54, 72, 46];
