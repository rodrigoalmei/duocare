import { alertsMock } from '@/mocks/alerts.mock';
import type { AlertsRepository } from '@/repositories/AlertsRepository';
import type { AlertItem } from '@/types';

export class MockAlertsRepository implements AlertsRepository {
  private alerts: AlertItem[] = alertsMock.map((alert) => ({ ...alert }));

  async listAlerts() {
    return this.alerts.map((alert) => ({ ...alert }));
  }

  async getAlertById(id: string) {
    const alert = this.alerts.find((item) => item.id === id);
    return alert ? { ...alert } : null;
  }

  async markAsRead(id: string) {
    const index = this.alerts.findIndex((item) => item.id === id);
    if (index < 0) throw new Error('Alerta não encontrado.');
    this.alerts[index] = { ...this.alerts[index], read: true };
    return { ...this.alerts[index] };
  }
}
