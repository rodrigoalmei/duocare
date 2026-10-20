import type { ProfilePreference } from '@/types';

export const profileMock = {
  name: 'Nome da usuária',
  email: 'email@exemplo.com',
  phone: '(00) 00000-0000',
  status: 'Conta ativa',
} as const;

export const profilePreferencesMock: ProfilePreference[] = [
  { id: 'notifications', title: 'Notificações', description: 'Avisos do aplicativo', enabled: true },
  { id: 'privacy', title: 'Privacidade', description: 'Compartilhamento de dados', enabled: false },
];
