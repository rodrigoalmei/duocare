/** Contrato mínimo para futuros repositórios. A implementação atual usa mocks locais. */
export type RepositoryResult<T> = { data: T; source: 'mock' };
