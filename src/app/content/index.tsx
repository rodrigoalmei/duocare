import { Image, StyleSheet, View } from 'react-native';

import { BackHeader } from '@/components/navigation';
import { AppText, PrimaryButton, ScreenContainer } from '@/components/ui';
import { colors } from '@/constants/colors';
import { radius } from '@/constants/radius';
import { spacing } from '@/constants/spacing';
import { contentMock } from '@/mocks/content.mock';

export default function ContentDetailScreen() {
  const item = contentMock[0];
  return (
    <ScreenContainer scroll edges={['top', 'bottom', 'left', 'right']} contentStyle={styles.screen} maxWidth={720}>
      <BackHeader title="Conteúdo" />
      <View style={styles.heading}><AppText variant="caption" color={colors.brand.coral}>{item.category}</AppText><AppText variant="h1">{item.title}</AppText><AppText variant="body" color={colors.textSecondary}>Estrutura editorial com conteúdo neutro sujeito à revisão clínica.</AppText></View>
      <Image source={item.image} resizeMode="cover" style={styles.image} />
      <View style={styles.block}><AppText variant="title">Introdução</AppText><AppText variant="body" color={colors.textSecondary}>Texto demonstrativo. O conteúdo final será validado antes de publicação.</AppText></View>
      <View style={styles.block}><AppText variant="title">Conteúdos relacionados</AppText><AppText variant="body" color={colors.textSecondary}>Artigo relacionado 01 · aguardando validação.</AppText></View>
      <PrimaryButton label="Salvar conteúdo" />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({ screen: { gap: spacing[4] }, heading: { gap: spacing[2] }, image: { width: '100%', aspectRatio: 16 / 9, borderRadius: radius.xl }, block: { gap: spacing[2], padding: spacing[4], borderRadius: radius.lg, backgroundColor: colors.surface } });
