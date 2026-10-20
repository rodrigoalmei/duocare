import type { ExerciseRepository } from '@/repositories/ExerciseRepository';
import type { ExerciseItem } from '@/types';

const exercises: ExerciseItem[] = [
  { id: 'activity-01', title: 'Atividade demonstrativa 01', status: 'todo', statusLabel: 'A fazer', description: 'Duração e repetições a definir.' },
  { id: 'activity-02', title: 'Atividade demonstrativa 02', status: 'completed', statusLabel: 'Concluída', description: 'Duração e repetições a definir.' },
];

export class MockExerciseRepository implements ExerciseRepository {
  async listExercises() {
    return exercises.map((item) => ({ ...item }));
  }
}
