import { Image, StyleSheet, type ImageSourcePropType } from 'react-native';

import { colors } from '@/constants/colors';
import { radius } from '@/constants/radius';

type AvatarProps = { source: ImageSourcePropType; size?: number; label: string };

export function Avatar({ source, size = 48, label }: AvatarProps) {
  return (
    <Image
      accessibilityLabel={label}
      source={source}
      resizeMode="cover"
      style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
    />
  );
}

const styles = StyleSheet.create({
  image: { backgroundColor: colors.brand.softPink, borderRadius: radius.full },
});
