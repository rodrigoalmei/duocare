import type { AlertItem } from '@/types';

export interface AlertsRepository {
  listAlerts(): Promise<AlertItem[]>;
  getAlertById(id: string): Promise<AlertItem | null>;
  markAsRead(id: string): Promise<AlertItem>;
}
