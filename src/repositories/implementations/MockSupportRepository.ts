import type { SupportRepository } from '@/repositories/SupportRepository';
import type { SupportTopic } from '@/types';

const topics: SupportTopic[] = [
  { id: 'start', title: 'Primeiros passos', answer: 'Veja como navegar pelas áreas principais do protótipo.' },
  { id: 'account', title: 'Conta e acesso', answer: 'Recupere o acesso pela tela de login quando necessário.' },
  { id: 'devices', title: 'Dispositivos', answer: 'As conexões apresentadas são demonstrativas e não acessam dados reais.' },
];

export class MockSupportRepository implements SupportRepository {
  async listTopics() {
    return topics.map((item) => ({ ...item }));
  }
}
