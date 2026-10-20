import { apiClient } from '@/services/api/ApiClient';
import type { AlertItem } from '@/types';

export class AlertsService {
  listAlerts() {
    return apiClient.request<AlertItem[]>('/alerts');
  }

  getAlertById(id: string) {
    return apiClient.request<AlertItem>(`/alerts/${encodeURIComponent(id)}`);
  }

  markAsRead(id: string) {
    return apiClient.request<AlertItem>(`/alerts/${encodeURIComponent(id)}/read`, { method: 'PATCH' });
  }
}
