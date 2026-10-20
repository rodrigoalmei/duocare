import type { ComponentProps } from 'react';
import type { Href } from 'expo-router';
import { usePathname, useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { AppText } from '@/components/ui/AppText';
import { colors } from '@/constants/colors';
import { layout } from '@/constants/layout';
import { radius } from '@/constants/radius';
import { spacing } from '@/constants/spacing';

type SidebarItem = {
  label: string;
  route: Href;
  icon: ComponentProps<typeof Ionicons>['name'];
};

const items: SidebarItem[] = [
  { label: 'Início', route: '/home' as Href, icon: 'home-outline' },
  { label: 'Bebê', route: '/baby' as Href, icon: 'happy-outline' },
  { label: 'Saúde', route: '/health' as Href, icon: 'heart-outline' },
  { label: 'Conteúdos', route: '/contents' as Href, icon: 'book-outline' },
  { label: 'Perfil', route: '/profile' as Href, icon: 'person-outline' },
];

export function TabletSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <View style={styles.shell}>
      <View style={styles.rail} accessibilityRole="tablist">
        <View style={styles.brand} accessibilityLabel="DUOCARE">
          <AppText variant="h2" color={colors.surface}>D</AppText>
        </View>
        <View style={styles.navigation}>
          {items.map((item) => {
            const selected = pathname === String(item.route) || pathname.startsWith(`${String(item.route)}/`);
            return (
              <Pressable
                key={item.label}
                accessibilityRole="tab"
                accessibilityState={{ selected }}
                accessibilityLabel={item.label}
                onPress={() => router.push(item.route)}
                style={({ pressed }) => [styles.item, pressed && styles.pressed]}>
                <View style={[styles.icon, selected && styles.iconSelected]}>
                  <Ionicons name={item.icon} size={22} color={selected ? colors.surface : colors.neutral[300]} />
                </View>
                <AppText variant="caption" color={selected ? colors.surface : colors.neutral[300]} align="center">
                  {item.label}
                </AppText>
              </Pressable>
            );
          })}
        </View>
        <AppText variant="caption" color={colors.brand.motherPink} align="center" style={styles.version}>
          DUOCARE
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    width: layout.tabletSidebarWidth,
    height: '100%',
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[6],
    backgroundColor: colors.background,
  },
  rail: {
    flex: 1,
    minHeight: 560,
    alignItems: 'center',
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[5],
    borderRadius: radius.xl,
    backgroundColor: colors.neutral[950],
  },
  brand: { height: 48, alignItems: 'center', justifyContent: 'center' },
  navigation: { width: '100%', flex: 1, justifyContent: 'flex-start', gap: spacing[5], paddingTop: spacing[10] },
  item: { width: '100%', alignItems: 'center', gap: spacing[2] },
  icon: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.lg,
    backgroundColor: colors.neutral[700],
  },
  iconSelected: { backgroundColor: colors.brand.coral },
  version: { fontSize: 9 },
  pressed: { opacity: 0.78 },
});
