import type { HealthDetailsRepository } from '@/repositories/HealthDetailsRepository';
import type { HealthHistoryEntry, HealthMetric } from '@/types';

const metrics: HealthMetric[] = [
  { id: 'steps', label: 'Passos', value: '3.240*', period: 'Hoje', tone: 'mother', icon: 'arrow-up' },
  { id: 'sleep', label: 'Sono', value: '6h 40*', period: 'Última noite', tone: 'info', icon: 'moon' },
  { id: 'activity', label: 'Atividade', value: '32 min*', period: 'Hoje', tone: 'baby', icon: 'fitness' },
];

const weeklyActivity = [42, 66, 36, 82, 54, 72, 46];
const weeklySleep = [4, 6, 5, 7, 6, 7, 5];
const weeklySteps = [32, 62, 54, 74, 28, 66, 48];
const history: HealthHistoryEntry[] = [
  { id: 'history-01', label: 'Sono', value: '7 h 24 min*', date: 'Hoje', source: 'Dispositivo demonstrativo' },
  { id: 'history-02', label: 'Passos', value: '6.480*', date: 'Ontem', source: 'Dispositivo demonstrativo' },
  { id: 'history-03', label: 'Bem-estar', value: 'Registro pessoal', date: 'Esta semana', source: 'Informado pela usuária' },
];

export class MockHealthDetailsRepository implements HealthDetailsRepository {
  async getOverview() {
    return { metrics: metrics.map((item) => ({ ...item })), weeklyActivity: [...weeklyActivity] };
  }

  async getSleepDetail() {
    return { value: '7 h 24 min*', description: 'Resumo demonstrativo dos dados conectados.', chartValues: [...weeklySleep] };
  }

  async getStepsDetail() {
    return { value: '6.480 passos*', description: 'Visualização descritiva, sem definição de meta clínica.', chartValues: [...weeklySteps] };
  }

  async listHistory() {
    return history.map((item) => ({ ...item }));
  }
}
