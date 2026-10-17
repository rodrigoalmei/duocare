import type { TextStyle } from 'react-native';

export const fontFamily = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semiBold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
} as const;

export const typography = {
  display: { fontSize: 32, lineHeight: 40, fontFamily: fontFamily.bold },
  h1: { fontSize: 28, lineHeight: 36, fontFamily: fontFamily.bold },
  h2: { fontSize: 24, lineHeight: 32, fontFamily: fontFamily.bold },
  h3: { fontSize: 20, lineHeight: 28, fontFamily: fontFamily.semiBold },
  title: { fontSize: 18, lineHeight: 24, fontFamily: fontFamily.semiBold },
  bodyLarge: { fontSize: 16, lineHeight: 24, fontFamily: fontFamily.regular },
  body: { fontSize: 14, lineHeight: 20, fontFamily: fontFamily.regular },
  label: { fontSize: 14, lineHeight: 20, fontFamily: fontFamily.semiBold },
  caption: { fontSize: 12, lineHeight: 16, fontFamily: fontFamily.regular },
} satisfies Record<string, TextStyle>;

export type TypographyVariant = keyof typeof typography;
