import type { AlertsRepository } from '@/repositories/AlertsRepository';
import { AlertsService } from '@/services/AlertsService';

export class HttpAlertsRepository implements AlertsRepository {
  constructor(private readonly service = new AlertsService()) {}
  listAlerts() { return this.service.listAlerts(); }
  getAlertById(id: string) { return this.service.getAlertById(id); }
  markAsRead(id: string) { return this.service.markAsRead(id); }
}
