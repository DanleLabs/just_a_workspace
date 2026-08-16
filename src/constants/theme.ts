import '@/global.css';

import { Platform } from 'react-native';

export const Theme = {
  dark: {
    textPrimary: '#ffffff',
    textSecundary: '#6d6d6d',

    accent: '#2299f2',
    neutral: '#f7f7f7',

    background: '#000000',
    surface: '#181818',
    floating: "#232323",

    backgroundSelected: '#2E3135',

    shadow: '#000000',

    iconSize: 22,
  },
} as const;

export type ThemeColor = keyof typeof Theme.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;

export const FloatingTabBar = {
  height: 56,
  bottomOffset: 20,
  maxWidth: 260,
} as const;

export const FloatingTabBarInset = FloatingTabBar.height + FloatingTabBar.bottomOffset;
export const MaxContentWidth = 800;
