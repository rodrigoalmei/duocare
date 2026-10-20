import type { ExerciseItem } from '@/types';

export interface ExerciseRepository {
  listExercises(): Promise<ExerciseItem[]>;
}
