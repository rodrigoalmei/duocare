import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
import type { Href } from 'expo-router';
import { Stack, usePathname, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { colors } from '@/constants/colors';
import { AppProvider } from '@/contexts/AppContext';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { DataProvider } from '@/contexts/DataContext';

SplashScreen.preventAutoHideAsync().catch(() => undefined);

const publicPaths = new Set([
  '/', '/login', '/register', '/forgot-password', '/reset-password', '/verify-email',
  '/welcome', '/setup', '/mother', '/baby-setup', '/consents', '/connect-device', '/device-connected',
]);

function AppShell() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, restoring } = useAuth();
  const shouldGoToAuth = !restoring && !isAuthenticated && !publicPaths.has(pathname);
  const shouldGoToApp = !restoring && isAuthenticated && ['/login', '/register', '/forgot-password', '/reset-password', '/verify-email'].includes(pathname);

  useEffect(() => {
    if (restoring) return;
    if (shouldGoToAuth) router.replace('/(auth)/login' as Href);
    if (shouldGoToApp) router.replace('/home' as Href);
  }, [restoring, router, shouldGoToApp, shouldGoToAuth]);

  useEffect(() => {
    if (!restoring) SplashScreen.hideAsync();
  }, [restoring]);

  if (restoring || shouldGoToAuth || shouldGoToApp) return null;

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="postpartum" />
        <Stack.Screen name="devices" />
        <Stack.Screen name="development" />
        <Stack.Screen name="exercises" />
        <Stack.Screen name="content" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded && !fontError) return null;

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <DataProvider>
          <AppProvider>
            <AppShell />
          </AppProvider>
        </DataProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
