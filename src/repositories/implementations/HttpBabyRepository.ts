import type { BabyRepository } from '@/repositories/BabyRepository';
import { BabyService } from '@/services/BabyService';

export class HttpBabyRepository implements BabyRepository {
  constructor(private readonly service = new BabyService()) {}
  getBaby() { return this.service.getBaby(); }
  updateBaby(profile: Parameters<BabyRepository['updateBaby']>[0]) { return this.service.updateBaby(profile); }
}
