import type { ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';

import { TabletSidebar } from '@/components/navigation/TabletSidebar';
import { useResponsive } from '@/hooks/useResponsive';

import { ScreenContainer } from './ScreenContainer';

type Props = ComponentProps<typeof ScreenContainer>;

export function AppScreenContainer(props: Props) {
  const { isTabletLayout } = useResponsive();

  if (!isTabletLayout) return <ScreenContainer {...props} />;

  return (
    <View style={styles.shell}>
      <TabletSidebar />
      <View style={styles.content}>
        <ScreenContainer {...props} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: { flex: 1, flexDirection: 'row' },
  content: { flex: 1, minWidth: 0 },
});
