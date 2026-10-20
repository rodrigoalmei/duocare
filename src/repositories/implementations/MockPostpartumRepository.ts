import { motherMock } from '@/mocks/mother.mock';
import type { PostpartumRepository } from '@/repositories/PostpartumRepository';

export class MockPostpartumRepository implements PostpartumRepository {
  async getSummary() {
    return {
      days: motherMock.postpartumDays,
      phase: motherMock.postpartumPhase,
      avatar: motherMock.avatar,
    };
  }
}
