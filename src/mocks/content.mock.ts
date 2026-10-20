import type { ContentItem } from '@/types';

export const contentMock: ContentItem[] = [
  {
    id: 'content-demo-01',
    category: 'PARA VOCÊ · 5 MIN',
    title: 'Cuidado e bem-estar no puerpério',
    duration: 'Conteúdo demonstrativo',
    image: require('@/assets/illustrations/mother-baby-hero.png'),
    summary: 'Informações organizadas para apoiar a leitura nesta fase.',
    body: [
      'Este espaço demonstra a hierarquia editorial do aplicativo. O texto definitivo será revisado pelos profissionais responsáveis antes da publicação.',
      'A leitura foi planejada com linhas confortáveis, espaçamento generoso e chamadas claras para conteúdos relacionados.',
    ],
  },
  {
    id: 'content-demo-02',
    category: 'DESENVOLVIMENTO',
    title: 'Acompanhamento do bebê',
    duration: 'Aguardando validação',
    image: require('@/assets/illustrations/baby-development-hero.png'),
    summary: 'Uma visão neutra para acompanhar registros e conteúdos do bebê.',
    body: ['Conteúdo demonstrativo, sem avaliação ou classificação clínica.'],
  },
  {
    id: 'content-demo-03',
    category: 'AMAMENTAÇÃO · 4 MIN',
    title: 'Conteúdo aguardando validação',
    duration: 'Leitura demonstrativa',
    image: require('@/assets/illustrations/mother-baby-hero.png'),
    summary: 'Estrutura editorial preparada para receber conteúdo validado.',
    body: ['O conteúdo clínico final ainda será definido pela equipe responsável.'],
  },
  {
    id: 'content-demo-04',
    category: 'EXERCÍCIOS',
    title: 'Movimento e cuidado',
    duration: 'Atividade demonstrativa',
    image: require('@/assets/illustrations/maternal-exercise.png'),
    summary: 'Estrutura sem prescrição, frequência ou contraindicação.',
    body: ['As orientações serão publicadas somente após validação profissional.'],
  },
];
