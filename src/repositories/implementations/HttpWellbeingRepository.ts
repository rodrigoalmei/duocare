import { contractPending } from '@/repositories/contractPending';
import type { WellbeingRepository } from '@/repositories/WellbeingRepository';
import type { WellbeingEntry } from '@/types';

export class HttpWellbeingRepository implements WellbeingRepository {
  async getOptions() {
    // TODO(backend-contract): conectar quando o contrato de bem-estar for definido.
    return contractPending('bem-estar');
  }

  async saveEntry(_entry: Omit<WellbeingEntry, 'id' | 'createdAt'>) {
    return contractPending('bem-estar');
  }
}
