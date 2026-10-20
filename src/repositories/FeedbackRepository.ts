import type { FeedbackOptions, FeedbackPayload } from '@/types';

export interface FeedbackRepository {
  getOptions(): Promise<FeedbackOptions>;
  submitFeedback(payload: FeedbackPayload): Promise<void>;
}
