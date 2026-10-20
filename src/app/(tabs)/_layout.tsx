import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TabletSidebar } from '@/components/navigation';
import { colors } from '@/constants/colors';
import { layout, shadow } from '@/constants/layout';
import { radius } from '@/constants/radius';
import { fontFamily } from '@/constants/typography';
import { useResponsive } from '@/hooks/useResponsive';

export default function TabsLayout() {
  const { isTabletLayout } = useResponsive();
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      tabBar={isTabletLayout ? () => <TabletSidebar /> : undefined}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.brand.coral,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarHideOnKeyboard: true,
        tabBarPosition: isTabletLayout ? 'left' : 'bottom',
        tabBarVariant: isTabletLayout ? 'material' : 'uikit',
        tabBarLabelPosition: 'below-icon',
        tabBarLabelStyle: { fontFamily: fontFamily.regular, fontSize: 11 },
        tabBarStyle: isTabletLayout
          ? { width: layout.tabletSidebarWidth, borderRightWidth: 0, backgroundColor: colors.background }
          : {
              position: 'absolute',
              height: layout.bottomTabHeight + insets.bottom,
              left: 24,
              right: 24,
              bottom: 0,
              paddingTop: 8,
              paddingBottom: Math.max(insets.bottom, 8),
              borderTopWidth: 0,
              borderRadius: radius.xl,
              backgroundColor: colors.surface,
              ...shadow.md,
            },
      }}>
      <Tabs.Screen name="home" options={{ title: 'Início', tabBarAccessibilityLabel: 'Início', tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="contents" options={{ title: 'Conteúdos', tabBarAccessibilityLabel: 'Conteúdos', tabBarIcon: ({ color, size }) => <Ionicons name="book-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="alerts" options={{ title: 'Alertas', tabBarAccessibilityLabel: 'Alertas', tabBarIcon: ({ color, size }) => <Ionicons name="notifications-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="profile" options={{ title: 'Perfil', tabBarAccessibilityLabel: 'Perfil', tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} /> }} />
      <Tabs.Screen name="baby" options={{ href: null }} />
      <Tabs.Screen name="health" options={{ href: null }} />
    </Tabs>
  );
}
