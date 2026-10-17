import type { PropsWithChildren, ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  type ScrollViewProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

import { colors } from '@/constants/colors';
import { layout } from '@/constants/layout';
import { useResponsive } from '@/hooks/useResponsive';

type ScreenContainerProps = PropsWithChildren<{
  scroll?: boolean;
  keyboard?: boolean;
  backgroundColor?: string;
  contentStyle?: StyleProp<ViewStyle>;
  maxWidth?: number;
  centered?: boolean;
  edges?: Edge[];
  footer?: ReactNode;
  keyboardShouldPersistTaps?: ScrollViewProps['keyboardShouldPersistTaps'];
}>;

export function ScreenContainer({
  children,
  scroll = false,
  keyboard = false,
  backgroundColor = colors.background,
  contentStyle,
  maxWidth,
  centered = true,
  edges = ['top', 'left', 'right'],
  footer,
  keyboardShouldPersistTaps = 'handled',
}: ScreenContainerProps) {
  const { isSmallPhone, isTablet } = useResponsive();
  const horizontalPadding = isTablet
    ? layout.tabletPadding
    : isSmallPhone
      ? layout.smallPhonePadding
      : layout.phonePadding;
  const resolvedMaxWidth = maxWidth ?? (isTablet ? layout.tabletContentMaxWidth : layout.phoneMaxWidth);
  const sharedContentStyle = [
    styles.content,
    {
      paddingHorizontal: horizontalPadding,
      maxWidth: resolvedMaxWidth,
      alignSelf: centered ? ('center' as const) : undefined,
    },
    contentStyle,
  ];

  const body = scroll ? (
    <ScrollView
      style={styles.fill}
      contentContainerStyle={[sharedContentStyle, styles.scrollContent]}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}>
      {children}
    </ScrollView>
  ) : (
    <View style={sharedContentStyle}>{children}</View>
  );

  const content = keyboard ? (
    <KeyboardAvoidingView
      style={styles.fill}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {body}
    </KeyboardAvoidingView>
  ) : (
    body
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]} edges={edges}>
      {content}
      {footer}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  fill: { flex: 1 },
  content: { width: '100%', flex: 1 },
  scrollContent: { flexGrow: 1, paddingBottom: 112 },
});
