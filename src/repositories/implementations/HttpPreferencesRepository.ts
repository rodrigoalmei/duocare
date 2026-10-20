import { contractPending } from '@/repositories/contractPending';
import type { PreferencesRepository } from '@/repositories/PreferencesRepository';
import type { UserPreferences } from '@/types';

export class HttpPreferencesRepository implements PreferencesRepository {
  async getPreferences() {
    // TODO(backend-contract): conectar quando o contrato de preferências for definido.
    return contractPending('preferências');
  }

  async updatePreferences(_preferences: UserPreferences) {
    return contractPending('preferências');
  }
}
