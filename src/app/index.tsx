import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Animated, Image, Platform, StyleSheet, View } from 'react-native';

import { AppText, ScreenContainer } from '@/components/ui';
import { colors } from '@/constants/colors';
import { radius } from '@/constants/radius';
import { spacing } from '@/constants/spacing';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function SplashScreenRoute() {
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  const [opacity] = useState(() => new Animated.Value(0));
  const [translateY] = useState(() => new Animated.Value(14));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: reducedMotion ? 120 : 320, useNativeDriver: Platform.OS !== 'web' }),
      Animated.timing(translateY, { toValue: 0, duration: reducedMotion ? 0 : 320, useNativeDriver: Platform.OS !== 'web' }),
    ]).start();
    const timeout = setTimeout(() => router.replace('/(auth)/login' as Href), 1500);
    return () => clearTimeout(timeout);
  }, [opacity, reducedMotion, router, translateY]);

  return (
    <ScreenContainer backgroundColor="#FFF8F6" edges={['top', 'bottom', 'left', 'right']}>
      <View style={styles.decorTop} />
      <Animated.View style={[styles.content, { opacity, transform: [{ translateY }] }]}>
        <Image
          accessibilityLabel="Mãe com bebê"
          source={require('@/assets/illustrations/mother-baby-hero.png')}
          resizeMode="cover"
          style={styles.hero}
        />
        <AppText variant="display" align="center">DUOCARE</AppText>
        <AppText variant="title" color={colors.textSecondary} align="center" style={styles.tagline}>
          Cuidado para você e para o seu bebê.
        </AppText>
        <View style={styles.dots} accessibilityLabel="Carregando">
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
        <AppText variant="caption" color={colors.neutral[500]} align="center">
          NUTES · Saúde materno-infantil
        </AppText>
      </Animated.View>
      <View style={styles.decorBottom} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing[5], zIndex: 1 },
  hero: { width: 220, height: 220, borderRadius: radius.full, backgroundColor: colors.brand.softPink },
  tagline: { maxWidth: 300 },
  dots: { flexDirection: 'row', gap: spacing[2], alignItems: 'center' },
  dot: { width: 8, height: 8, borderRadius: radius.full, backgroundColor: colors.brand.motherPink },
  activeDot: { width: 10, height: 10, backgroundColor: colors.brand.coral },
  decorTop: { position: 'absolute', width: 180, height: 180, borderRadius: 90, backgroundColor: colors.brand.lightPink, top: -54, left: -46 },
  decorBottom: { position: 'absolute', width: 160, height: 160, borderRadius: 80, backgroundColor: colors.brand.babyCream, right: -58, bottom: -68 },
});
