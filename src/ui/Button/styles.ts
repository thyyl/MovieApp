// components/ui/button/button.styles.ts

import { colors, spacing } from '../../theme';

export const buttonBase = {
  minHeight: 48,
  flexDirection: 'row' as const,
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
  overflow: 'hidden' as const,
};

export const variants = {
  primary: {
    backgroundColor: colors.palette.primary,
  },
  secondary: {
    backgroundColor: colors.palette.secondary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
};

export const sizes = {
  sm: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  md: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  lg: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
};

export const rounded = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 16,
  full: 999,
};

export const textBase = {
  fontSize: 16,
  fontWeight: '600' as const,
  textAlign: 'center' as const,
  color: colors.palette.white,
};

export const textDisabled = {
  color: colors.palette.neutral900,
  opacity: 0.5,
};

export const pressed = {
  opacity: 0.9,
};

export const disabled = {
  backgroundColor: colors.palette.disabled,
};

export const accessoryLeft = {
  paddingRight: spacing.xs,
};

export const accessoryRight = {
  marginStart: spacing.xs,
};
