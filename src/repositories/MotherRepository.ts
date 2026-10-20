import type { MotherProfile } from '@/types';

export interface MotherRepository {
  getProfile(): Promise<MotherProfile | null>;
  updateProfile(profile: Partial<MotherProfile>): Promise<MotherProfile>;
}
