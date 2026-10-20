import type { AuthRepository } from '@/repositories/AuthRepository';
import { AuthService } from '@/services/AuthService';
import { sessionStorage } from '@/storage/sessionStorage';
import type { Session } from '@/types';

function isExpired(session: Session) {
  return session.expiresAt ? Date.parse(session.expiresAt) <= Date.now() : false;
}

export class HttpAuthRepository implements AuthRepository {
  constructor(private readonly service = new AuthService()) {}

  async signIn(email: string, password: string) {
    const session = await this.service.signIn(email, password);
    await sessionStorage.set(session);
    return session;
  }

  async signOut(): Promise<void> {
    try {
      await this.service.signOut();
    } catch {
      // A revogação remota é best-effort; a sessão local sempre deve ser encerrada.
    } finally {
      await sessionStorage.clear();
    }
  }

  async restoreSession(): Promise<Session | null> {
    const session = await sessionStorage.get();
    if (!session) return null;
    if (!isExpired(session)) return session;

    if (!session.refreshToken) {
      await sessionStorage.clear();
      return null;
    }

    try {
      const refreshed = await this.service.refresh(session.refreshToken);
      await sessionStorage.set(refreshed);
      return refreshed;
    } catch {
      await sessionStorage.clear();
      return null;
    }
  }
}
