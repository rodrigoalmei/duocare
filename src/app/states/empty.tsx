import { useRouter } from 'expo-router';
import { EmptyState } from '@/components/system';
export default function EmptyStateScreen() { const router = useRouter(); return <EmptyState title="Ainda não há informações" description="Quando novos dados estiverem disponíveis, eles aparecerão aqui." hint="Volte e consulte novamente mais tarde." actionLabel="Voltar" onAction={() => router.back()} />; }
