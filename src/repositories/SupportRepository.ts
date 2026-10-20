import type { SupportTopic } from '@/types';

export interface SupportRepository {
  listTopics(): Promise<SupportTopic[]>;
}
