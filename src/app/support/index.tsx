import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { AppScreenContainer, ResponsiveGrid } from '@/components/layout';
import { BackHeader } from '@/components/navigation';
import { EmptyState, ErrorState, LoadingState } from '@/components/system';
import { AppText, Card, PrimaryButton } from '@/components/ui';
import { colors } from '@/constants/colors';
import { radius } from '@/constants/radius';
import { spacing } from '@/constants/spacing';
import { useSupport } from '@/hooks/useSupport';

export default function SupportScreen() {
  const [open, setOpen] = useState<string>();
  const { data: faqs, loading, error, refresh } = useSupport();
  if (loading) return <LoadingState />;
  if (error) return <ErrorState title="Não foi possível carregar o suporte" description={error} hint="Tente novamente." actionLabel="Tentar novamente" onAction={() => void refresh()} />;
  if (!faqs || faqs.length === 0) return <EmptyState title="Nenhum tópico disponível" description="Os tópicos de suporte ainda não estão disponíveis." hint="Atualize para verificar novamente." actionLabel="Atualizar" onAction={() => void refresh()} />;
  return (
    <AppScreenContainer scroll edges={['top', 'bottom', 'left', 'right']} contentStyle={styles.screen}>
      <BackHeader title="Ajuda e suporte" />
      <View style={styles.heading}><AppText variant="caption" color={colors.brand.coral}>SUPORTE</AppText><AppText variant="h1">Como podemos ajudar?</AppText><AppText variant="bodyLarge" color={colors.textSecondary}>Encontre respostas rápidas ou consulte formas de contato.</AppText></View>
      <ResponsiveGrid smallPhoneColumns={1} phoneColumns={1} tabletColumns={2} largeTabletColumns={3}>{faqs.map((item) => <Pressable key={item.id} accessibilityRole="button" accessibilityState={{ expanded: open === item.id }} onPress={() => setOpen((current) => current === item.id ? undefined : item.id)} style={styles.faq}><View style={styles.faqTitle}><View style={styles.icon}><Ionicons name="help-outline" size={22} color={colors.text} /></View><AppText variant="title" style={styles.faqCopy}>{item.title}</AppText><Ionicons name={open === item.id ? 'chevron-up' : 'chevron-down'} size={20} color={colors.textSecondary} /></View>{open === item.id ? <AppText variant="body" color={colors.textSecondary}>{item.answer}</AppText> : null}</Pressable>)}</ResponsiveGrid>
      <Card style={styles.contact}><View style={styles.contactCopy}><AppText variant="h3">Falar com a equipe</AppText><AppText variant="body" color={colors.textSecondary}>Canal, disponibilidade e expectativa de resposta ainda serão validados.</AppText></View><PrimaryButton label="Ver formas de contato" /></Card>
    </AppScreenContainer>
  );
}
const styles = StyleSheet.create({ screen: { gap: spacing[5] }, heading: { gap: spacing[2] }, faq: { minHeight: 92, gap: spacing[3], padding: spacing[4], borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, backgroundColor: colors.surface }, faqTitle: { flexDirection: 'row', alignItems: 'center', gap: spacing[3] }, icon: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center', borderRadius: radius.full, backgroundColor: colors.brand.babyCream }, faqCopy: { flex: 1 }, contact: { gap: spacing[4], backgroundColor: colors.brand.lightPink }, contactCopy: { gap: spacing[2] } });
