import type { MotherRepository } from '@/repositories/MotherRepository';
import { MotherService } from '@/services/MotherService';

export class HttpMotherRepository implements MotherRepository {
  constructor(private readonly service = new MotherService()) {}
  getProfile() { return this.service.getProfile(); }
  updateProfile(profile: Parameters<MotherRepository['updateProfile']>[0]) { return this.service.updateProfile(profile); }
}
