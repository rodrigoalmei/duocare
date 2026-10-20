import type { HealthHistoryEntry, HealthOverview, SleepDetail, StepsDetail } from '@/types';

export interface HealthDetailsRepository {
  getOverview(): Promise<HealthOverview>;
  getSleepDetail(): Promise<SleepDetail | null>;
  getStepsDetail(): Promise<StepsDetail | null>;
  listHistory(): Promise<HealthHistoryEntry[]>;
}
