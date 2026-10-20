import type { WellbeingRepository } from '@/repositories/WellbeingRepository';
import type { WellbeingEntry, WellbeingOptions } from '@/types';

const options: WellbeingOptions = {
  ratings: [1, 2, 3, 4, 5],
  periods: ['Agora', 'Esta semana'],
};

export class MockWellbeingRepository implements WellbeingRepository {
  private entries: WellbeingEntry[] = [];

  async getOptions() {
    return { ratings: [...options.ratings], periods: [...options.periods] };
  }

  async saveEntry(entry: Omit<WellbeingEntry, 'id' | 'createdAt'>) {
    const saved: WellbeingEntry = {
      ...entry,
      id: `wellbeing-${this.entries.length + 1}`,
      createdAt: new Date().toISOString(),
    };
    this.entries.push(saved);
    return { ...saved };
  }
}
