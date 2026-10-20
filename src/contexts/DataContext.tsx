import { createContext, useCallback, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react';

import { useAuth } from '@/contexts/AuthContext';
import { repositories } from '@/repositories';
import type { AlertItem, BabyProfile, ContentItem, MotherProfile } from '@/types';

type DataContextValue = {
  mother: MotherProfile | null;
  baby: BabyProfile | null;
  contents: ContentItem[];
  alerts: AlertItem[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  updateMother: (profile: Partial<MotherProfile>) => Promise<MotherProfile>;
  updateBaby: (profile: Partial<BabyProfile>) => Promise<BabyProfile>;
  markAlertAsRead: (id: string) => Promise<AlertItem>;
};

const DataContext = createContext<DataContextValue | undefined>(undefined);

function getMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Não foi possível carregar os dados.';
}

export function DataProvider({ children }: PropsWithChildren) {
  const { isAuthenticated, user } = useAuth();
  const [mother, setMother] = useState<MotherProfile | null>(null);
  const [baby, setBaby] = useState<BabyProfile | null>(null);
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadedUserId, setLoadedUserId] = useState<string>();
  const [error, setError] = useState<string | null>(null);

  const clear = useCallback(() => {
    setMother(null);
    setBaby(null);
    setContents([]);
    setAlerts([]);
    setLoadedUserId(undefined);
    setError(null);
  }, []);

  const refresh = useCallback(async () => {
    if (!isAuthenticated || !user) {
      clear();
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const [nextMother, nextBaby, nextContents, nextAlerts] = await Promise.all([
        repositories.mother.getProfile(),
        repositories.baby.getBaby(),
        repositories.content.listContents(),
        repositories.alerts.listAlerts(),
      ]);
      setMother(nextMother);
      setBaby(nextBaby);
      setContents(nextContents);
      setAlerts(nextAlerts);
    } catch (cause) {
      setError(getMessage(cause));
    } finally {
      setLoadedUserId(user.id);
      setLoading(false);
    }
  }, [clear, isAuthenticated, user]);

  useEffect(() => {
    const timer = setTimeout(() => void refresh(), 0);
    return () => clearTimeout(timer);
  }, [refresh]);

  const updateMother = useCallback(async (profile: Partial<MotherProfile>) => {
    const updated = await repositories.mother.updateProfile(profile);
    setMother(updated);
    return updated;
  }, []);

  const updateBaby = useCallback(async (profile: Partial<BabyProfile>) => {
    const updated = await repositories.baby.updateBaby(profile);
    setBaby(updated);
    return updated;
  }, []);

  const markAlertAsRead = useCallback(async (id: string) => {
    const updated = await repositories.alerts.markAsRead(id);
    setAlerts((current) => current.map((alert) => alert.id === id ? updated : alert));
    return updated;
  }, []);

  const value = useMemo<DataContextValue>(() => ({
    mother,
    baby,
    contents,
    alerts,
    loading: loading || Boolean(isAuthenticated && user && loadedUserId !== user.id),
    error,
    refresh,
    updateMother,
    updateBaby,
    markAlertAsRead,
  }), [alerts, baby, contents, error, isAuthenticated, loadedUserId, loading, markAlertAsRead, mother, refresh, updateBaby, updateMother, user]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData deve ser usado dentro de DataProvider.');
  return context;
}
