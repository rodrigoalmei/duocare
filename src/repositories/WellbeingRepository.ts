import type { WellbeingEntry, WellbeingOptions } from '@/types';

export interface WellbeingRepository {
  getOptions(): Promise<WellbeingOptions>;
  saveEntry(entry: Omit<WellbeingEntry, 'id' | 'createdAt'>): Promise<WellbeingEntry>;
}
