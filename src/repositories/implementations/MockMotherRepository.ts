import { motherMock } from '@/mocks/mother.mock';
import type { MotherRepository } from '@/repositories/MotherRepository';
import type { MotherProfile } from '@/types';

export class MockMotherRepository implements MotherRepository {
  private profile: MotherProfile = { ...motherMock };

  async getProfile() {
    return { ...this.profile };
  }

  async updateProfile(profile: Partial<MotherProfile>) {
    this.profile = { ...this.profile, ...profile };
    return { ...this.profile };
  }
}
