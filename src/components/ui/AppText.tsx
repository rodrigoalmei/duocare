import { Text, type TextProps, type TextStyle } from 'react-native';

import { colors } from '@/constants/colors';
import { typography, type TypographyVariant } from '@/constants/typography';

type AppTextProps = TextProps & {
  variant?: TypographyVariant;
  color?: string;
  align?: TextStyle['textAlign'];
};

export function AppText({
  variant = 'body',
  color = colors.text,
  align,
  style,
  maxFontSizeMultiplier = 1.5,
  ...props
}: AppTextProps) {
  return (
    <Text
      maxFontSizeMultiplier={maxFontSizeMultiplier}
      style={[typography[variant], { color, textAlign: align }, style]}
      {...props}
    />
  );
}
