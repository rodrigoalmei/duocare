import { apiClient } from '@/services/api/ApiClient';
import type { BabyProfile } from '@/types';

export class BabyService {
  getBaby() {
    return apiClient.request<BabyProfile>('/baby/profile');
  }

  updateBaby(profile: Partial<BabyProfile>) {
    return apiClient.request<BabyProfile>('/baby/profile', { method: 'PUT', body: profile });
  }
}
