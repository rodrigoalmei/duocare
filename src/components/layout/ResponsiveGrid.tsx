import { Children, type ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { spacing } from '@/constants/spacing';
import { useResponsive } from '@/hooks/useResponsive';

type ResponsiveGridProps = {
  children: ReactNode;
  smallPhoneColumns?: number;
  phoneColumns?: number;
  tabletColumns?: number;
  largeTabletColumns?: number;
  gap?: number;
  style?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
};

export function ResponsiveGrid({
  children,
  smallPhoneColumns = 2,
  phoneColumns = 2,
  tabletColumns = 3,
  largeTabletColumns = 4,
  gap = spacing[3],
  style,
  itemStyle,
}: ResponsiveGridProps) {
  const { isSmallPhone, isPhone, isTablet } = useResponsive();
  const columnCount = isSmallPhone
    ? smallPhoneColumns
    : isPhone
      ? phoneColumns
      : isTablet
        ? tabletColumns
        : largeTabletColumns;
  const items = Children.toArray(children);
  const rows = Array.from({ length: Math.ceil(items.length / columnCount) }, (_, rowIndex) =>
    items.slice(rowIndex * columnCount, rowIndex * columnCount + columnCount),
  );

  return (
    <View style={[styles.grid, { gap }, style]}>
      {rows.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={[styles.row, { gap }]}>
          {row.map((item, itemIndex) => (
            <View key={`item-${rowIndex}-${itemIndex}`} style={[styles.item, itemStyle]}>
              {item}
            </View>
          ))}
          {Array.from({ length: columnCount - row.length }, (_, spacerIndex) => (
            <View
              key={`spacer-${rowIndex}-${spacerIndex}`}
              accessible={false}
              style={[styles.item, styles.spacer, itemStyle]}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { width: '100%' },
  row: { width: '100%', flexDirection: 'row', alignItems: 'stretch' },
  item: { flex: 1, minWidth: 0 },
  spacer: { opacity: 0 },
});
