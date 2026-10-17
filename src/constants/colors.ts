export const colors = {
  brand: {
    coral: '#FF5849',
    motherPink: '#FFB6AF',
    softPink: '#FAD5D1',
    lightPink: '#FFE8E5',
    babyCream: '#FFDEAF',
    contrastBlue: '#AFF8FF',
  },
  neutral: {
    950: '#211A20',
    700: '#514A50',
    500: '#777077',
    300: '#CFC9CD',
    100: '#F5F2F3',
    0: '#FFFFFF',
  },
  status: {
    info: '#176A73',
    infoSurface: '#E5FAFC',
    success: '#237A57',
    successSurface: '#E8F7EF',
    warning: '#8A4B08',
    warningSurface: '#FFF4DF',
    error: '#B42318',
    errorSurface: '#FDECEA',
  },
  background: '#FFFDFB',
  surface: '#FFFFFF',
  text: '#211A20',
  textSecondary: '#514A50',
  border: '#E4DEE2',
  overlay: 'rgba(33, 26, 32, 0.42)',
} as const;

export type AppColors = typeof colors;
