import { babyMock } from '@/mocks/baby.mock';
import { contentMock } from '@/mocks/content.mock';
import type { DevelopmentRepository } from '@/repositories/DevelopmentRepository';
import type { DevelopmentMilestone } from '@/types';

const milestones: DevelopmentMilestone[] = [
  { id: 'phase-01', index: '1', title: 'Fase atual', description: 'Conteúdo aguardando validação' },
  { id: 'phase-02', index: '2', title: 'Próxima fase', description: 'Marco de desenvolvimento' },
  { id: 'phase-03', index: '3', title: 'Histórico', description: 'Registros anteriores' },
];

export class MockDevelopmentRepository implements DevelopmentRepository {
  async getDevelopment() {
    const featuredContent = contentMock.find((item) => item.id === 'content-demo-02') ?? null;
    return {
      baby: { ...babyMock },
      milestones: milestones.map((item) => ({ ...item })),
      featuredContent: featuredContent ? { ...featuredContent } : null,
    };
  }
}
