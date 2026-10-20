import type { BabyProfile } from '@/types';

export interface BabyRepository {
  getBaby(): Promise<BabyProfile | null>;
  updateBaby(profile: Partial<BabyProfile>): Promise<BabyProfile>;
}
