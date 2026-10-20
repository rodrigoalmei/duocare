import type { HealthHistoryItem, HealthMetric } from '@/types';

export { wearableMock } from './wearable.mock';

export const healthMetricsMock: HealthMetric[] = [
  { id: 'steps', label: 'Passos', value: '3.240*', period: 'Hoje', tone: 'mother', icon: 'arrow-up' },
  { id: 'sleep', label: 'Sono', value: '6h 40*', period: 'Última noite', tone: 'info', icon: 'moon' },
  { id: 'activity', label: 'Atividade', value: '32 min*', period: 'Hoje', tone: 'baby', icon: 'fitness' },
];

export const weeklyActivityMock = [42, 66, 36, 82, 54, 72, 46];

export const weeklySleepMock = [4, 6, 5, 7, 6, 7, 5];
export const weeklyStepsMock = [32, 62, 54, 74, 28, 66, 48];

export const healthHistoryMock: HealthHistoryItem[] = [
  { id: 'history-01', label: 'Sono', value: '7 h 24 min*', date: 'Hoje', source: 'Dispositivo demonstrativo' },
  { id: 'history-02', label: 'Passos', value: '6.480*', date: 'Ontem', source: 'Dispositivo demonstrativo' },
  { id: 'history-03', label: 'Bem-estar', value: 'Registro pessoal', date: 'Esta semana', source: 'Informado pela usuária' },
];
