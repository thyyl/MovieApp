import { ChevronDown, ChevronRight } from 'lucide-react-native';
import React, { ReactElement, useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { colors, spacing } from '../theme';
import { Text } from './Text';

type Presets = keyof typeof $containerPresets;

export interface DropdownOption<T = string> {
  label: string;
  value: T;
}

interface DropdownProps<T = string> {
  /**
   * One of the different types of presets.
   */
  preset?: Presets;
  /**
   * The current selected value
   */
  value: T;
  /**
   * Array of dropdown options
   */
  options: DropdownOption<T>[];
  /**
   * Callback when value changes
   */
  onValueChange: (value: T) => void;
  /**
   * Override container style
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Override text style
   */
  textStyle?: StyleProp<TextStyle>;
  /**
   * Override dropdown menu style
   */
  menuStyle?: StyleProp<ViewStyle>;
  /**
   * Override option item style
   */
  optionStyle?: StyleProp<ViewStyle>;
  /**
   * Placeholder text when no value selected
   */
  placeholder?: string;
  /**
   * Disable the dropdown
   */
  disabled?: boolean;
  /**
   * Custom render for dropdown items
   */
  renderItem?: (item: DropdownOption<T>, isSelected: boolean) => ReactElement;
  /**
   * Show arrow icon
   */
  showArrow?: boolean;
}

export function Dropdown<T = string>(props: DropdownProps<T>) {
  const {
    value,
    options,
    onValueChange,
    style: $containerStyleOverride,
    textStyle: $textStyleOverride,
    menuStyle: $menuStyleOverride,
    optionStyle: $optionStyleOverride,
    placeholder = 'Select...',
    disabled = false,
    renderItem,
    showArrow = true,
  } = props;

  const preset: Presets = props.preset ?? 'default';
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(opt => opt.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  const toggleDropdown = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
  };

  const selectOption = (option: DropdownOption<T>) => {
    onValueChange(option.value);
    toggleDropdown();
  };

  const $containerStyle = [
    $containerPresets[preset],
    disabled && $disabledContainer,
    $containerStyleOverride,
  ];

  const $textStyle = [
    $textPresets[preset],
    disabled && $disabledText,
    $textStyleOverride,
  ];

  const $menuStyle = [$menuContainer, $menuStyleOverride];
  const $optionStyle = [$menuItem, $optionStyleOverride];

  const defaultRenderItem = (item: DropdownOption<T>, isSelected: boolean) => {
    return (
      <View
        style={[
          ...(Array.isArray($optionStyle) ? $optionStyle : [$optionStyle]),
          isSelected && $menuItemSelected,
        ]}
      >
        <Text
          weight={isSelected ? 'bold' : 'normal'}
          text={item.label}
          style={[$menuItemText, isSelected && $menuItemTextSelected]}
        />
      </View>
    );
  };

  return (
    <View style={$containerStyle}>
      {/* Dropdown Header */}
      <TouchableOpacity
        style={$buttonStyles}
        onPress={toggleDropdown}
        activeOpacity={0.7}
        disabled={disabled}
        accessibilityLabel="Dropdown"
        accessibilityRole="button"
        accessibilityState={{ disabled, expanded: isOpen }}
      >
        <Text
          text={displayText}
          style={[!selectedOption && $placeholderText, $textStyle]}
        />
        {showArrow && (isOpen ? <ChevronDown /> : <ChevronRight />)}
      </TouchableOpacity>

      {isOpen && (
        <View
          style={[...(Array.isArray($menuStyle) ? $menuStyle : [$menuStyle])]}
        >
          <View style={styles.optionsContainer}>
            {options.map(option => {
              const isSelected = option.value === value;
              return (
                <TouchableOpacity
                  key={String(option.value)}
                  onPress={() => selectOption(option)}
                  activeOpacity={0.7}
                  accessibilityLabel={option.label}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                >
                  {renderItem
                    ? renderItem(option, isSelected)
                    : defaultRenderItem(option, isSelected)}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
}

// Base styles
const $containerBase: ViewStyle = {
  flexDirection: 'column',
  justifyContent: 'space-between',
  paddingVertical: spacing.sm,
  paddingHorizontal: spacing.md,
  borderRadius: spacing.xs,
  borderWidth: 1,
};

const $menuContainer: ViewStyle = {
  borderBottomLeftRadius: spacing.xs,
  borderBottomRightRadius: spacing.xs,
  shadowColor: colors.palette.neutral400,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 3,
};

const $menuItem: ViewStyle = {
  borderRadius: spacing.xxxs,
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.sm,
  justifyContent: 'center',
  backgroundColor: colors.palette.neutral200,
  marginBottom: spacing.xxs,
};

const $menuItemSelected: ViewStyle = {
  backgroundColor: colors.palette.primary,
};

const $menuItemText: TextStyle = {
  fontSize: 16,
  color: colors.text,
};

const $menuItemTextSelected: TextStyle = {
  color: colors.palette.neutral100,
};

const $placeholderText: TextStyle = {
  color: colors.textDim,
};

const $disabledContainer: ViewStyle = {
  opacity: 0.5,
};

const $disabledText: TextStyle = {
  color: colors.textDim,
};

// Presets
const $containerPresets = {
  default: [
    $containerBase,
    {
      borderColor: colors.palette.neutral250,
    },
  ] as StyleProp<ViewStyle>,
};

const $textPresets: Record<Presets, TextStyle> = {
  default: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
};

const $buttonStyles: StyleProp<ViewStyle> = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const styles = StyleSheet.create({
  optionsContainer: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
});
