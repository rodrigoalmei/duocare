import { contractPending } from '@/repositories/contractPending';
import type { HealthDetailsRepository } from '@/repositories/HealthDetailsRepository';

export class HttpHealthDetailsRepository implements HealthDetailsRepository {
  async getOverview() {
    // TODO(backend-contract): conectar quando o contrato de detalhes de saúde for definido.
    return contractPending('detalhes de saúde');
  }

  async getSleepDetail() {
    return contractPending('sono');
  }

  async getStepsDetail() {
    return contractPending('passos');
  }

  async listHistory() {
    return contractPending('histórico de saúde');
  }
}
