export function contractPending(domain: string): never {
  throw new Error(`Contrato HTTP de ${domain} ainda não definido.`);
}
