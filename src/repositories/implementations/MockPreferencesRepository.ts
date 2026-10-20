import type { PreferencesRepository } from '@/repositories/PreferencesRepository';
import type { UserPreferences } from '@/types';

export class MockPreferencesRepository implements PreferencesRepository {
  private preferences: UserPreferences = [
    { id: 'notifications', title: 'Notificações', description: 'Avisos do aplicativo', enabled: true },
    { id: 'privacy', title: 'Privacidade', description: 'Compartilhamento de dados', enabled: false },
  ];

  async getPreferences() {
    return this.preferences.map((item) => ({ ...item }));
  }

  async updatePreferences(preferences: UserPreferences) {
    this.preferences = preferences.map((item) => ({ ...item }));
    return this.getPreferences();
  }
}
