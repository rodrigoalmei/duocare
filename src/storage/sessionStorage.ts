import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

import type { Session } from '@/types';

const SESSION_KEY = 'duocare.session.v1';
function parseSession(value: string | null): Session | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as Session;
  } catch {
    return null;
  }
}

export const sessionStorage = {
  async get(): Promise<Session | null> {
    if (Platform.OS === 'web') {
      return typeof window === 'undefined' ? null : parseSession(window.sessionStorage.getItem(SESSION_KEY));
    }
    return parseSession(await SecureStore.getItemAsync(SESSION_KEY));
  },

  async set(session: Session): Promise<void> {
    if (Platform.OS === 'web') {
      if (typeof window !== 'undefined') window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return;
    }
    await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(session), {
      keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    });
  },

  async clear(): Promise<void> {
    if (Platform.OS === 'web') {
      if (typeof window !== 'undefined') window.sessionStorage.removeItem(SESSION_KEY);
      return;
    }
    await SecureStore.deleteItemAsync(SESSION_KEY);
  },
};
