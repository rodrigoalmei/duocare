import { StyleSheet, View } from 'react-native';

import { Chip } from '@/components/ui';
import { spacing } from '@/constants/spacing';

type Props = {
  periods?: string[];
  selected: string;
  onSelect: (period: string) => void;
};

export function PeriodTabs({ periods = ['Hoje', '7 dias', '30 dias'], selected, onSelect }: Props) {
  return (
    <View accessibilityRole="tablist" style={styles.row}>
      {periods.map((period) => (
        <Chip key={period} label={period} selected={selected === period} onPress={() => onSelect(period)} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({ row: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing[2] } });
