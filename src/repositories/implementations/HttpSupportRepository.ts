import { contractPending } from '@/repositories/contractPending';
import type { SupportRepository } from '@/repositories/SupportRepository';

export class HttpSupportRepository implements SupportRepository {
  async listTopics() {
    // TODO(backend-contract): conectar quando o contrato de suporte for definido.
    return contractPending('suporte');
  }
}
