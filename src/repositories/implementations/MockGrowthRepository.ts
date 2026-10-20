import { babyMock } from '@/mocks/baby.mock';
import type { GrowthRepository } from '@/repositories/GrowthRepository';
import type { GrowthRecord } from '@/types';

const records: GrowthRecord[] = [36, 44, 42, 58, 62, 70, 74].map((value, index) => ({
  id: `growth-${index + 1}`,
  label: String(index + 1),
  value,
}));

export class MockGrowthRepository implements GrowthRepository {
  async getGrowth() {
    return { baby: { ...babyMock }, records: records.map((record) => ({ ...record })) };
  }
}
