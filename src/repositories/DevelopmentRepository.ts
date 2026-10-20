import type { DevelopmentItem } from '@/types';

export interface DevelopmentRepository {
  getDevelopment(): Promise<DevelopmentItem | null>;
}
