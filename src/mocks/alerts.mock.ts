import type { AlertItem } from '@/types';

export const alertsMock: AlertItem[] = [
  {
    id: 'alert-demo-01',
    title: 'Sincronização disponível',
    description: 'O aplicativo recebeu uma atualização do dispositivo conectado.',
    source: 'Dado demonstrativo do dispositivo',
    createdAt: 'Agora',
    read: false,
  },
];
