import { contractPending } from '@/repositories/contractPending';
import type { ExerciseRepository } from '@/repositories/ExerciseRepository';

export class HttpExerciseRepository implements ExerciseRepository {
  async listExercises() {
    // TODO(backend-contract): conectar quando o contrato de exercícios for definido.
    return contractPending('exercícios');
  }
}
