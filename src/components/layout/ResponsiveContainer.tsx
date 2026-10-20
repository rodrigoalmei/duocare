import type { PropsWithChildren } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { layout } from '@/constants/layout';
import { useResponsive } from '@/hooks/useResponsive';

type ResponsiveContainerProps = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
  maxWidth?: number;
  centered?: boolean;
  padded?: boolean;
}>;

export function ResponsiveContainer({
  children,
  style,
  maxWidth,
  centered = true,
  padded = true,
}: ResponsiveContainerProps) {
  const { isSmallPhone, isTabletLayout, isLargeTablet } = useResponsive();
  const horizontalPadding = isLargeTablet
    ? layout.largeTabletPadding
    : isTabletLayout
      ? layout.tabletPadding
      : isSmallPhone
        ? layout.smallPhonePadding
        : layout.phonePadding;
  const resolvedMaxWidth = maxWidth ?? (isTabletLayout ? layout.tabletContentMaxWidth : layout.phoneMaxWidth);

  return (
    <View
      style={[
        styles.container,
        {
          maxWidth: resolvedMaxWidth,
          paddingHorizontal: padded ? horizontalPadding : 0,
          alignSelf: centered ? 'center' : undefined,
        },
        style,
      ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%' },
});
