import type { UserPreferences } from '@/types';

export interface PreferencesRepository {
  getPreferences(): Promise<UserPreferences>;
  updatePreferences(preferences: UserPreferences): Promise<UserPreferences>;
}
