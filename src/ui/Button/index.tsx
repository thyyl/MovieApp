import React, { ComponentType } from 'react';
import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {
  accessoryLeft,
  accessoryRight,
  buttonBase,
  disabled,
  pressed,
  rounded,
  sizes,
  textBase,
  textDisabled,
  variants,
} from './styles';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonRounded = 'none' | 'sm' | 'md' | 'lg' | 'full';

export interface ButtonAccessoryProps {
  style: StyleProp<any>;
  pressableState: PressableStateCallbackType;
}

export interface ButtonProps extends PressableProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  rounded?: ButtonRounded;

  text?: string;

  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabledTextStyle?: StyleProp<TextStyle>;
  disabledStyle?: StyleProp<ViewStyle>;
  pressedTextStyle?: StyleProp<TextStyle>;

  IconLeft?: ComponentType<ButtonAccessoryProps>;
  IconRight?: ComponentType<ButtonAccessoryProps>;

  children?: React.ReactNode;
}

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    rounded: radius = 'md',
    disabled: isDisabled,

    text,
    children,

    style,
    textStyle,
    pressedTextStyle,
    disabledStyle,
    disabledTextStyle,

    IconLeft,
    IconRight,

    ...rest
  } = props;

  return (
    <Pressable
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!isDisabled }}
      style={() => {
        return [
          buttonBase,
          variants[variant],
          sizes[size],
          { borderRadius: rounded[radius] },

          isDisabled && [disabled, disabledStyle],
          style,
        ];
      }}
      {...rest}
    >
      {state => (
        <>
          {IconLeft && (
            <IconLeft style={accessoryLeft} pressableState={state} />
          )}

          <Text
            style={[
              textBase,
              textStyle,
              state.pressed && !isDisabled && [pressed, pressedTextStyle],
              isDisabled && [textDisabled, disabledTextStyle],
            ]}
          >
            {text ?? children}
          </Text>

          {IconRight && (
            <IconRight style={accessoryRight} pressableState={state} />
          )}
        </>
      )}
    </Pressable>
  );
}
