import type { ContentItem } from '@/types';

export const contentMock: ContentItem[] = [
  {
    id: 'content-demo-01',
    category: 'PARA VOCÊ · 5 MIN',
    title: 'Cuidado e bem-estar no puerpério',
    duration: 'Conteúdo demonstrativo',
    image: require('@/assets/illustrations/mother-baby-hero.png'),
  },
  {
    id: 'content-demo-02',
    category: 'DESENVOLVIMENTO',
    title: 'Acompanhamento do bebê',
    duration: 'Aguardando validação',
    image: require('@/assets/illustrations/baby-development-hero.png'),
  },
];
