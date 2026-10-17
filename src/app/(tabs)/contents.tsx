import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ContentCard, StatusCard } from '@/components/cards';
import { AppText, Chip, ScreenContainer } from '@/components/ui';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { contentMock } from '@/mocks/content.mock';

export default function ContentsScreen() {
  const router = useRouter();
  return (
    <ScreenContainer scroll contentStyle={styles.screen}>
      <View style={styles.heading}>
        <AppText variant="caption" color={colors.brand.coral}>CONTEÚDOS</AppText>
        <AppText variant="h1">Para o seu momento</AppText>
        <AppText variant="body" color={colors.textSecondary}>Informações organizadas por temas.</AppText>
      </View>
      <View style={styles.chips}>
        <Chip label="Todos" selected />
        <Chip label="Puerpério" />
        <Chip label="Amamentação" />
        <Chip label="Bebê" />
      </View>
      <View style={styles.list}>
        {contentMock.map((item) => <ContentCard key={item.id} item={item} compact onPress={() => router.push('/content' as Href)} />)}
      </View>
      <StatusCard icon="document-text-outline" title="Conteúdo em validação" description="Novos materiais serão publicados após validação clínica." />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  screen: { paddingTop: spacing[5], gap: spacing[5] },
  heading: { gap: spacing[1] },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing[2] },
  list: { gap: spacing[3] },
});
