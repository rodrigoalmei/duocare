import type { DevelopmentRepository } from '@/repositories/DevelopmentRepository';
import { contractPending } from '@/repositories/contractPending';

export class HttpDevelopmentRepository implements DevelopmentRepository {
  async getDevelopment() {
    // TODO(backend-contract): conectar quando o contrato de desenvolvimento for definido.
    return contractPending('desenvolvimento do bebê');
  }
}
