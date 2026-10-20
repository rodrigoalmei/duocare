import type { Baby } from '@/types';

export const babyMock: Baby = {
  id: 'baby-demo-01',
  name: 'Bebê',
  ageLabel: '3 meses*',
  weightLabel: 'Peso —',
  lengthLabel: 'Comprimento —',
  avatar: require('@/assets/illustrations/baby-development-hero.png'),
};

export const babyTimelineMock = [
  { id: 'phase-01', index: '1', title: 'Fase atual', description: 'Conteúdo aguardando validação' },
  { id: 'phase-02', index: '2', title: 'Próxima fase', description: 'Marco de desenvolvimento' },
  { id: 'phase-03', index: '3', title: 'Histórico', description: 'Registros anteriores' },
] as const;

export const growthMock = [36, 44, 42, 58, 62, 70, 74];
