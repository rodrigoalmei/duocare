import { apiClient } from '@/services/api/ApiClient';
import type { Session } from '@/types';

export class AuthService {
  signIn(email: string, password: string) {
    return apiClient.request<Session>('/auth/login', {
      method: 'POST',
      authenticated: false,
      body: { email, password },
    });
  }

  refresh(refreshToken: string) {
    return apiClient.request<Session>('/auth/refresh', {
      method: 'POST',
      authenticated: false,
      body: { refreshToken },
    });
  }

  signOut() {
    return apiClient.request<void>('/auth/logout', { method: 'POST' });
  }
}
