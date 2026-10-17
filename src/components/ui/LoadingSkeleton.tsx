import { useEffect, useState } from 'react';
import { Animated, Platform, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import { colors } from '@/constants/colors';
import { radius } from '@/constants/radius';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type LoadingSkeletonProps = { style?: StyleProp<ViewStyle> };

export function LoadingSkeleton({ style }: LoadingSkeletonProps) {
  const [opacity] = useState(() => new Animated.Value(0.65));
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: reducedMotion ? 700 : 600, useNativeDriver: Platform.OS !== 'web' }),
        Animated.timing(opacity, { toValue: 0.65, duration: reducedMotion ? 700 : 600, useNativeDriver: Platform.OS !== 'web' }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [opacity, reducedMotion]);

  return <Animated.View accessibilityLabel="Carregando conteúdo" style={[styles.skeleton, style, { opacity }]} />;
}

const styles = StyleSheet.create({
  skeleton: { backgroundColor: colors.neutral[100], borderRadius: radius.md, minHeight: 20 },
});
