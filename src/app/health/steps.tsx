import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';

import { HealthDetailScreen } from '@/components/health';
import { EmptyState, ErrorState, LoadingState } from '@/components/system';
import { useStepsDetail } from '@/hooks/useHealthDetails';

export default function StepsDetailScreen() {
  const router = useRouter();
  const { data, loading, error, refresh } = useStepsDetail();
  if (loading) return <LoadingState />;
  if (error) return <ErrorState title="Não foi possível carregar os passos" description={error} hint="Tente novamente." actionLabel="Tentar novamente" onAction={() => void refresh()} />;
  if (!data) return <EmptyState title="Sem dados de passos" description="Ainda não há dados demonstrativos disponíveis." hint="Atualize para verificar novamente." actionLabel="Atualizar" onAction={() => void refresh()} />;
  return <HealthDetailScreen title="Passos" description={data.description} value={data.value} chartValues={data.chartValues} onOpenHistory={() => router.push('/health/history' as Href)} />;
}
