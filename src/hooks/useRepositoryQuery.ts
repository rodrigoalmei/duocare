import { useCallback, useEffect, useState } from 'react';

function getMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Não foi possível carregar os dados.';
}

export function useRepositoryQuery<T>(loader: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setData(await loader());
    } catch (cause) {
      setError(getMessage(cause));
    } finally {
      setLoading(false);
    }
  }, [loader]);

  useEffect(() => {
    const timer = setTimeout(() => void refresh(), 0);
    return () => clearTimeout(timer);
  }, [refresh]);

  return { data, loading, error, refresh, setData };
}
