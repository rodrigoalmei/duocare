import type { AuthRepository } from '@/repositories/AuthRepository';
import { sessionStorage } from '@/storage/sessionStorage';
import type { Session } from '@/types';

export class MockAuthRepository implements AuthRepository {
  async signIn(email: string, password: string): Promise<Session> {
    if (!/^\S+@\S+\.\S+$/.test(email) || password.length < 4) {
      throw new Error('Informe um e-mail válido e uma senha com pelo menos 4 caracteres.');
    }

    const session: Session = {
      accessToken: 'development-session',
      expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
      user: {
        id: 'user-demo-01',
        name: 'Nome da usuária',
        email,
        role: 'mother',
      },
    };
    await sessionStorage.set(session);
    return session;
  }

  async signOut(): Promise<void> {
    await sessionStorage.clear();
  }

  restoreSession() {
    return sessionStorage.get();
  }
}
