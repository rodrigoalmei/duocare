import type { PostpartumSummary } from '@/types';

export interface PostpartumRepository {
  getSummary(): Promise<PostpartumSummary | null>;
}
