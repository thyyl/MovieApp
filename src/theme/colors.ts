const palette = {
  neutral100: '#FFFFFF',
  neutral200: '#F4F2F1',
  neutral250: '#E3E3E3',
  neutral300: '#F8F8F8',
  neutral400: '#999999',
  neutral500: '#D9D9D9',
  neutral900: '#000000',

  primary: '#00B4E4',
  secondary: '#042541',

  disabled: '#E4E4E4',

  angry100: '#F2D6CD',
  angry500: '#C03403',

  overlay20: 'rgba(25, 16, 21, 0.2)',
  overlay50: 'rgba(25, 16, 21, 0.5)',

  white: '#FFFFFF',
  gray: '#C0C0C0',
} as const;

export const colors = {
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: 'rgba(0, 0, 0, 0)',

  /**
   * A helper for making something see-thru.
   */
  translucent: 'rgba(0, 0, 0, 0.15)',

  /**
   * The default text color in many components.
   */
  text: palette.neutral900,
  /**
   * Secondary text information.
   */
  textDim: palette.neutral400,
  /**
   * The default color of the screen background.
   */
  background: palette.white,
  /**
   * The default border color.
   */
  border: palette.neutral250,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral300,
  /**
   * Error messages.
   */
  error: palette.angry500,
  /**
   * Error Background.
   *
   */
  errorBackground: palette.angry100,
};
