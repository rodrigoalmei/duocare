import { MetricCard } from '@/components/cards';
import type { HealthMetric } from '@/types';

export function HealthMetricCard({ metric }: { metric: HealthMetric }) {
  return <MetricCard metric={metric} />;
}
