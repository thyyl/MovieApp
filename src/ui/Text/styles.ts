import { TextStyle } from 'react-native';
import { colors } from '../../theme';

export const base = {
  color: colors.text,
  fontWeight: '400',
  fontSize: 14,
  lineHeight: 21,
} as TextStyle;

export const sizes = {
  xxxl: { fontSize: 42, lineHeight: 46 },
  xxl: { fontSize: 36, lineHeight: 44 },
  xl: { fontSize: 24, lineHeight: 34 },
  lg: { fontSize: 20, lineHeight: 32 },
  md: { fontSize: 18, lineHeight: 26 },
  sm: { fontSize: 16, lineHeight: 24 },
  xs: { fontSize: 14, lineHeight: 21 },
  xxs: { fontSize: 12, lineHeight: 18 },
  xxxs: { fontSize: 10, lineHeight: 15 },
  xxxxs: { fontSize: 8, lineHeight: 12 },
} as const;

export const letterSpacings = {
  extraWide: { letterSpacing: 2 },
  medium: { letterSpacing: 1.5 },
  wide: { letterSpacing: 1 },
  normal: { letterSpacing: 0 },
  narrow: { letterSpacing: -1 },
  extraNarrow: { letterSpacing: -2 },
} as const;

export const variants = {
  default: base,

  bold: {
    ...base,
    fontWeight: 'bold',
  },

  heading: {
    ...base,
    ...sizes.xl,
    fontWeight: '600',
    textAlign: 'center',
  },

  subheading: {
    ...base,
    ...sizes.lg,
    fontWeight: '600',
  },

  title: {
    ...base,
    ...sizes.sm,
    fontWeight: '600',
  },

  subtitle: {
    ...base,
    ...sizes.xs,
    fontWeight: '400',
    color: colors.textDim,
  },

  formLabel: {
    ...base,
    fontWeight: '500',
  },

  formHelper: {
    ...base,
    ...sizes.sm,
    fontWeight: '400',
  },
} as const;
