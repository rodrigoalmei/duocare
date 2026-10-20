import type { Session } from '@/types';

export interface AuthRepository {
  signIn(email: string, password: string): Promise<Session>;
  signOut(): Promise<void>;
  restoreSession(): Promise<Session | null>;
}
