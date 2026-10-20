import { useWindowDimensions } from 'react-native';

export function useResponsive() {
  const { width, height } = useWindowDimensions();
  const isSmallPhone = width < 375;
  const isPhone = width >= 375 && width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isLargeTablet = width >= 1024;

  return {
    width,
    height,
    isSmallPhone,
    isPhone,
    isTablet,
    isLargeTablet,
    isTabletLayout: isTablet || isLargeTablet,
  };
}
