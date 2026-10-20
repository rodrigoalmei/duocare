import { contractPending } from '@/repositories/contractPending';
import type { GrowthRepository } from '@/repositories/GrowthRepository';

export class HttpGrowthRepository implements GrowthRepository {
  async getGrowth() {
    // TODO(backend-contract): conectar quando o contrato de crescimento for definido.
    return contractPending('crescimento');
  }
}
