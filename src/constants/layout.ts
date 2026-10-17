export const layout = {
  phonePadding: 24,
  smallPhonePadding: 20,
  tabletPadding: 32,
  phoneMaxWidth: 430,
  tabletContentMaxWidth: 960,
  tabletReadingMaxWidth: 720,
  minTouchTarget: 48,
  bottomTabHeight: 68,
} as const;

export const shadow = {
  sm: {
    shadowColor: '#211A20',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#211A20',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
} as const;
