import { useWindowDimensions } from 'react-native';

export function useResponsive() {
  const { width, height } = useWindowDimensions();

  return {
    width,
    height,
    isSmallPhone: width < 375,
    isPhone: width >= 375 && width < 768,
    isTablet: width >= 768,
  };
}
