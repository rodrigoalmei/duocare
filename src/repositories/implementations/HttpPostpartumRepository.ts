import { contractPending } from '@/repositories/contractPending';
import type { PostpartumRepository } from '@/repositories/PostpartumRepository';

export class HttpPostpartumRepository implements PostpartumRepository {
  async getSummary() {
    // TODO(backend-contract): conectar quando o contrato de puerpério for definido.
    return contractPending('puerpério');
  }
}
