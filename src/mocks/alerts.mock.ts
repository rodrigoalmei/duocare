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
  {
    id: 'alert-demo-02',
    title: 'Novo material para consulta',
    description: 'Um conteúdo demonstrativo foi adicionado à biblioteca.',
    source: 'Conteúdo',
    createdAt: 'Ontem',
    read: false,
  },
  {
    id: 'alert-demo-03',
    title: 'Preferência atualizada',
    description: 'Uma configuração do aplicativo foi alterada.',
    source: 'Conta',
    createdAt: '02 out',
    read: true,
  },
];
