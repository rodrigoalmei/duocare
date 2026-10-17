import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { spacing } from '@/constants/spacing';

import { AppText } from '../ui/AppText';
import { IconButton } from '../ui/IconButton';

type BackHeaderProps = { title: string };

export function BackHeader({ title }: BackHeaderProps) {
  const router = useRouter();
  return (
    <View style={styles.header}>
      <IconButton icon="arrow-back" label="Voltar" onPress={() => router.back()} />
      <AppText variant="title" style={styles.title} numberOfLines={2}>
        {title}
      </AppText>
      <View style={styles.spacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { minHeight: 56, flexDirection: 'row', alignItems: 'center', gap: spacing[3] },
  title: { flex: 1, textAlign: 'center' },
  spacer: { width: 48 },
});
