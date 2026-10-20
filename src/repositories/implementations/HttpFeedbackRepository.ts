import { contractPending } from '@/repositories/contractPending';
import type { FeedbackRepository } from '@/repositories/FeedbackRepository';
import type { FeedbackPayload } from '@/types';

export class HttpFeedbackRepository implements FeedbackRepository {
  async getOptions() {
    // TODO(backend-contract): conectar quando o contrato de feedback for definido.
    return contractPending('feedback');
  }

  async submitFeedback(_payload: FeedbackPayload) {
    return contractPending('feedback');
  }
}
