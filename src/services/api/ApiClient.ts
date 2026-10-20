import { getRequiredApiUrl } from '@/constants/env';
import { sessionStorage } from '@/storage/sessionStorage';

const DEFAULT_TIMEOUT_MS = 12_000;

type RequestOptions = Omit<RequestInit, 'body' | 'headers'> & {
  authenticated?: boolean;
  body?: unknown;
  headers?: Record<string, string>;
  timeoutMs?: number;
};

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly payload?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class ApiClient {
  async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const {
      authenticated = true,
      body,
      headers,
      timeoutMs = DEFAULT_TIMEOUT_MS,
      ...requestInit
    } = options;
    const baseUrl = getRequiredApiUrl();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const session = authenticated ? await sessionStorage.get() : null;
      const response = await fetch(`${baseUrl}${path.startsWith('/') ? path : `/${path}`}`, {
        ...requestInit,
        body: body === undefined ? undefined : JSON.stringify(body),
        signal: controller.signal,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...(session?.accessToken ? { Authorization: `Bearer ${session.accessToken}` } : {}),
          ...headers,
        },
      });

      const contentType = response.headers.get('content-type') ?? '';
      const payload: unknown = response.status === 204
        ? undefined
        : contentType.includes('application/json')
          ? await response.json()
          : await response.text();

      if (!response.ok) {
        const message = typeof payload === 'object' && payload !== null && 'message' in payload
          ? String(payload.message)
          : `Falha na requisição (${response.status}).`;
        throw new ApiError(message, response.status, payload);
      }

      return payload as T;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      if (error instanceof Error && error.name === 'AbortError') {
        throw new ApiError('A requisição excedeu o tempo limite.', 408);
      }
      throw new ApiError('Não foi possível conectar ao servidor.', 0, error);
    } finally {
      clearTimeout(timeout);
    }
  }
}

export const apiClient = new ApiClient();
