import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, View, type ImageSourcePropType } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, PrimaryButton, TextButton } from '@/components/ui';
import { colors } from '@/constants/colors';
import { layout } from '@/constants/layout';
import { radius } from '@/constants/radius';
import { spacing } from '@/constants/spacing';
import { useAppContext } from '@/contexts/AppContext';
import { useResponsive } from '@/hooks/useResponsive';

type OnboardingPage = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
  imageSurface: string;
  cardTitle: string;
  cardDescription: string;
};

const pages: OnboardingPage[] = [
  {
    id: 'mother-care',
    eyebrow: 'CUIDADO MATERNO',
    title: 'Cuidado que acompanha você',
    description: 'Uma experiência acolhedora para organizar sua jornada com clareza.',
    image: require('@/assets/illustrations/mother-baby-hero.png'),
    imageSurface: colors.brand.softPink,
    cardTitle: 'Acompanhamento simples',
    cardDescription: 'Informações reunidas em uma visão leve e organizada.',
  },
  {
    id: 'baby-development',
    eyebrow: 'DESENVOLVIMENTO',
    title: 'Perto de cada descoberta',
    description: 'Acompanhe informações do bebê em uma experiência pensada para a família.',
    image: require('@/assets/illustrations/baby-development-hero.png'),
    imageSurface: colors.brand.babyCream,
    cardTitle: 'Tudo em um só lugar',
    cardDescription: 'Registros, conteúdos e próximos passos com contexto.',
  },
  {
    id: 'connection',
    eyebrow: 'CONEXÃO',
    title: 'Dados com mais contexto',
    description: 'Conecte informações quando quiser e consulte históricos de forma clara.',
    image: require('@/assets/illustrations/wearable-health-hero.png'),
    imageSurface: colors.brand.contrastBlue,
    cardTitle: 'Você mantém o controle',
    cardDescription: 'Escolha o que deseja conectar e compartilhar.',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const { completeOnboarding } = useAppContext();
  const { isSmallPhone, isTabletLayout, isLargeTablet } = useResponsive();
  const [index, setIndex] = useState(0);
  const item = pages[index];
  const horizontalPadding = isLargeTablet
    ? layout.largeTabletPadding
    : isTabletLayout
      ? layout.tabletPadding
      : isSmallPhone
        ? layout.smallPhonePadding
        : layout.phonePadding;

  const finish = () => {
    completeOnboarding();
    router.replace('/home' as Href);
  };

  const goTo = (pageIndex: number) => {
    setIndex(pageIndex);
  };

  const next = () => {
    if (index === pages.length - 1) return finish();
    goTo(index + 1);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
      <View key={item.id} style={[styles.page, { paddingHorizontal: horizontalPadding }]}> 
        <View style={[styles.pageContent, isTabletLayout && styles.tabletContent]}>
          <View style={styles.heading}>
            <AppText variant="caption" color={colors.status.error} style={styles.eyebrow}>{item.eyebrow}</AppText>
            <AppText variant={isTabletLayout ? 'display' : 'h1'}>{item.title}</AppText>
            <AppText variant="bodyLarge" color={colors.textSecondary}>{item.description}</AppText>
          </View>
          <View style={[styles.imageFrame, { backgroundColor: item.imageSurface }]}> 
            <Image accessibilityLabel={item.title} source={item.image} resizeMode="cover" style={styles.image} />
          </View>
          <View style={styles.infoCard}>
            <AppText variant="title">{item.cardTitle}</AppText>
            <AppText variant="body" color={colors.textSecondary}>{item.cardDescription}</AppText>
          </View>
        </View>
      </View>
      <View style={[styles.footer, { paddingHorizontal: horizontalPadding }, isTabletLayout && styles.tabletFooter]}>
        <View style={styles.indicator} accessibilityLabel={`Etapa ${index + 1} de ${pages.length}`}>
          {pages.map((page, itemIndex) => <View key={page.id} style={[styles.dot, itemIndex === index && styles.activeDot]} />)}
        </View>
        <PrimaryButton label={index === pages.length - 1 ? 'Começar' : 'Continuar'} onPress={next} />
        <TextButton label={index === pages.length - 1 ? 'Voltar' : 'Pular'} onPress={index === pages.length - 1 ? () => goTo(1) : finish} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, width: '100%', backgroundColor: colors.background },
  page: { flex: 1, width: '100%' },
  pageContent: { width: '100%', maxWidth: layout.phoneMaxWidth, alignSelf: 'center', paddingTop: spacing[5], gap: spacing[5] },
  tabletContent: { maxWidth: layout.tabletReadingMaxWidth },
  heading: { gap: spacing[2] },
  eyebrow: { fontFamily: 'Inter_600SemiBold' },
  imageFrame: { width: '100%', aspectRatio: 342 / 177, minHeight: 172, maxHeight: 280, borderRadius: radius.xl, padding: spacing[4] },
  image: { width: '100%', height: '100%', borderRadius: radius.lg },
  infoCard: { width: '100%', gap: spacing[1], padding: spacing[4], borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  footer: { width: '100%', gap: spacing[1], paddingBottom: spacing[2] },
  tabletFooter: { maxWidth: layout.tabletReadingMaxWidth, alignSelf: 'center' },
  indicator: { height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing[2] },
  dot: { width: 8, height: 8, borderRadius: radius.full, backgroundColor: colors.brand.softPink },
  activeDot: { width: 20, backgroundColor: colors.brand.coral },
});
