import type { GrowthSnapshot } from '@/types';

export interface GrowthRepository {
  getGrowth(): Promise<GrowthSnapshot | null>;
}
