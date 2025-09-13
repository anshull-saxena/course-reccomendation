// Theme provider using tokens.json for React Native
import tokens from './tokens.json';
import { Platform, Appearance } from 'react-native';

const colorScheme = Appearance.getColorScheme();

const theme = {
  color: {
    ...tokens.color,
    primary: colorScheme === 'dark' ? tokens.color.primaryDark : tokens.color.primary,
    onPrimary: colorScheme === 'dark' ? tokens.color.onPrimaryDark : tokens.color.onPrimary,
    surface: colorScheme === 'dark' ? tokens.color.surfaceDark : tokens.color.surface,
    onSurface: colorScheme === 'dark' ? tokens.color.onSurfaceDark : tokens.color.onSurface,
    background: colorScheme === 'dark' ? tokens.color.backgroundDark : tokens.color.background,
  },
  typography: tokens.typography,
  radius: tokens.radius,
  space: tokens.space,
  elevation: tokens.elevation,
  motion: tokens.motion,
  isDark: colorScheme === 'dark',
  isHighContrast: false, // TODO: add high-contrast detection
};

export default theme;
