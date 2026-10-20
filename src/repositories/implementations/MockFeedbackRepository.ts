import type { FeedbackRepository } from '@/repositories/FeedbackRepository';
import type { FeedbackOptions, FeedbackPayload } from '@/types';

const options: FeedbackOptions = {
  ratings: [1, 2, 3, 4, 5],
  categories: ['Facilidade', 'Conteúdo', 'Visual'],
};

export class MockFeedbackRepository implements FeedbackRepository {
  private submissions: FeedbackPayload[] = [];

  async getOptions() {
    return { ratings: [...options.ratings], categories: [...options.categories] };
  }

  async submitFeedback(payload: FeedbackPayload) {
    this.submissions.push({ ...payload });
  }
}
