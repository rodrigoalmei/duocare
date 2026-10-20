import { createContext, useCallback, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react';

import { repositories } from '@/repositories';
import type { Session, User } from '@/types';

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  restoring: boolean;
  isAuthenticated: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  restoreSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function getMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Não foi possível concluir a autenticação.';
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [restoring, setRestoring] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const restoreSession = useCallback(async () => {
    setRestoring(true);
    setError(null);
    try {
      setSession(await repositories.auth.restoreSession());
    } catch (cause) {
      setSession(null);
      setError(getMessage(cause));
    } finally {
      setRestoring(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => void restoreSession(), 0);
    return () => clearTimeout(timer);
  }, [restoreSession]);

  const signIn = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      setSession(await repositories.auth.signIn(email.trim(), password));
    } catch (cause) {
      const message = getMessage(cause);
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await repositories.auth.signOut();
      setSession(null);
    } catch (cause) {
      const message = getMessage(cause);
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user: session?.user ?? null,
    session,
    loading,
    restoring,
    isAuthenticated: Boolean(session),
    error,
    signIn,
    signOut,
    restoreSession,
  }), [error, loading, restoreSession, restoring, session, signIn, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider.');
  return context;
}
