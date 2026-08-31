import '@/global.css';

import { Platform } from 'react-native';

export const FloatingTabBar = {
  height: 56,
  bottomOffset: 20,
  maxWidth: 260,
} as const;

const FLOATING_TAB_BAR_HEIGHT = 56;
const FLOATING_TAB_BAR_BOTTOM = 20;

export const Theme = {
  Colors: {
    // Brand & Interactive
    accent: '#2299F2',
    selected: '#27353e',
    contrast: '#f8f8f8',
    accentMuted: 'rgba(34, 153, 242, 0.15)', // Для фона выделенных элементов/чипсов

    // Statuses
    success: '#34C759', // Success
    danger: '#FF453A',  // Danger
    warning: '#FF9F0A', // Warning

    // Surface & Layout (Dark mode hierarchy)
    background: '#101010', // True black
    surface: '#181818',    // Карточки, элементы списка
    floating: '#232323',   // Плавающие панели, таббар
    popup: '#282828',      // Модалки, меню, контекстные окна

    // Interactive States & Borders
    border: '#2C2C2E',     // Разделители списков, бордеры инпутов  // Фон выбранного элемента
    disabled: '#3A3A3C',   // Заблокированные кнопки

    // Text Hierarchy
    textPrimary: '#FFFFFF',
    textSecondary: '#787878', // Поправлена опечатка + более контрастный серый
    textMuted: '#636366',     // Плейсхолдеры, отключенный текст
    textOnAccent: '#FFFFFF',

    shadow: 'rgba(0, 0, 0, 0.5)',
    overlay: 'rgba(0, 0, 0, 0.7)',
  },

  Typography: {
    families: {
      regular: 'Geist-Regular',
      medium: 'Geist-Medium',
      semiBold: 'Geist-SemiBold',
      italic: 'Geist-Italic',
    },
    sizes: {
      xs: { fontSize: 12, lineHeight: 16 }, // Метаданные, теги, даты
      sm: { fontSize: 14, lineHeight: 20 }, // Вторичный текст, сабтитлы
      md: { fontSize: 16, lineHeight: 24 }, // Основной текст задачи / Body
      lg: { fontSize: 18, lineHeight: 26 }, // Крупные элементы / Кнопки
      xl: { fontSize: 22, lineHeight: 28 }, // Заголовки секций
      xxl: { fontSize: 28, lineHeight: 34 }, // Главные заголовки экранов
    },
  },

  Radii: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },

  Spacing: {
    none: 0,
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    xxxl: 48,
  },

  Icons: {
    sizeSm: 16,
    sizeMd: 24,
    sizeLg: 32,
    strokeWidth: 2,
  },

  Components: {
    FloatingTabBar: {
      height: FLOATING_TAB_BAR_HEIGHT,
      bottomOffset: FLOATING_TAB_BAR_BOTTOM,
      maxWidth: 260,
    },
    PlusButton: {
      bottomOffset: FLOATING_TAB_BAR_BOTTOM + FLOATING_TAB_BAR_HEIGHT + 12,
      rightOffset: 16,
      size: 56,
      iconSize: 28,
      iconStrokeWidth: 2.5,
    },
  },
} as const;

export type AppTheme = typeof Theme;
export type ColorToken = keyof typeof Theme.Colors;
export type SpacingToken = keyof typeof Theme.Spacing;

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

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;

export const FloatingTabBarInset = FloatingTabBar.height + FloatingTabBar.bottomOffset;
export const MaxContentWidth = 800;
