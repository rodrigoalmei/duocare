const rawApiUrl = process.env.EXPO_PUBLIC_API_URL?.trim();
const rawMocksFlag = process.env.EXPO_PUBLIC_ENABLE_MOCKS?.trim().toLowerCase();

function parseMocksFlag(value: string | undefined) {
  if (value === undefined || value === '' || value === 'true' || value === '1') return true;
  if (value === 'false' || value === '0') return false;
  throw new Error('EXPO_PUBLIC_ENABLE_MOCKS deve ser true, false, 1 ou 0.');
}

const enableMocks = parseMocksFlag(rawMocksFlag);

function validateApiUrl(value: string) {
  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    throw new Error('EXPO_PUBLIC_API_URL deve ser uma URL válida.');
  }

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    throw new Error('EXPO_PUBLIC_API_URL deve usar http ou https.');
  }

  return value.replace(/\/$/, '');
}

export const env = {
  apiUrl: rawApiUrl || undefined,
  enableMocks,
} as const;

export function getRequiredApiUrl() {
  if (!env.apiUrl) {
    throw new Error('EXPO_PUBLIC_API_URL não foi configurada para o modo real.');
  }
  return validateApiUrl(env.apiUrl);
}
