import { apiClient } from '@/services/api/ApiClient';
import type { MotherProfile } from '@/types';

export class MotherService {
  getProfile() {
    return apiClient.request<MotherProfile>('/mother/profile');
  }

  updateProfile(profile: Partial<MotherProfile>) {
    return apiClient.request<MotherProfile>('/mother/profile', { method: 'PUT', body: profile });
  }
}
