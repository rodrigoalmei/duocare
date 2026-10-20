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

import { ResponsiveContainer } from './ResponsiveContainer';

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
  const content = (
    <ResponsiveContainer
      centered={centered}
      maxWidth={maxWidth}
      style={[styles.content, scroll && styles.scrollContent, contentStyle]}>
      {children}
    </ResponsiveContainer>
  );
  const body = scroll ? (
    <ScrollView
      style={styles.fill}
      contentContainerStyle={styles.scrollViewport}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}>
      {content}
    </ScrollView>
  ) : (
    <View style={styles.fill}>{content}</View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]} edges={edges}>
      {keyboard ? (
        <KeyboardAvoidingView style={styles.fill} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          {body}
        </KeyboardAvoidingView>
      ) : (
        body
      )}
      {footer}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  fill: { flex: 1 },
  content: { flex: 1 },
  scrollViewport: { flexGrow: 1 },
  scrollContent: { paddingBottom: 112 },
});
