import React, { forwardRef, ForwardRefRenderFunction } from 'react';
import type { Text as RNTextType } from 'react-native';
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleProp,
  TextStyle,
} from 'react-native';

import { letterSpacings, sizes, variants } from './styles';

export type TextVariant = keyof typeof variants;
export type TextSize = keyof typeof sizes;
export type TextLetterSpacing = keyof typeof letterSpacings;
export type TextRef = RNTextType;

export type TextWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

export interface TextProps extends RNTextProps {
  text?: string;
  variant?: TextVariant;
  size?: TextSize;
  weight?: TextWeight;
  color?: string;
  letterSpacing?: TextLetterSpacing;
  underline?: boolean;
  italic?: boolean;
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}

const TextComponent: ForwardRefRenderFunction<TextRef, TextProps> = (
  props,
  ref,
) => {
  const {
    weight,
    size,
    text,
    letterSpacing,
    children,
    style: $styleOverride,
    color: $colorOverride,
    underline,
    italic,
    ...rest
  } = props;

  const content = text || children;
  const variant: TextVariant = props.variant ?? 'default';

  const $styles: StyleProp<TextStyle> = [
    variants[variant],
    weight && { fontWeight: weight },
    size && sizes[size],
    italic && { fontStyle: 'italic' },
    letterSpacing && letterSpacings[letterSpacing],
    underline && { textDecorationLine: 'underline' },
    $colorOverride && { color: $colorOverride },
    $styleOverride,
  ];

  return (
    <RNText ref={ref} {...rest} style={$styles}>
      {content}
    </RNText>
  );
};

export const Text = forwardRef<TextRef, TextProps>(TextComponent);
