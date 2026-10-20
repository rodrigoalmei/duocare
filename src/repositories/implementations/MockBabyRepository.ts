import { babyMock } from '@/mocks/baby.mock';
import type { BabyRepository } from '@/repositories/BabyRepository';
import type { BabyProfile } from '@/types';

export class MockBabyRepository implements BabyRepository {
  private baby: BabyProfile = { ...babyMock };

  async getBaby() {
    return { ...this.baby };
  }

  async updateBaby(profile: Partial<BabyProfile>) {
    this.baby = { ...this.baby, ...profile };
    return { ...this.baby };
  }
}
