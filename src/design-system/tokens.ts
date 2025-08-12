/**
 * Design System Color Tokens
 *
 * This file defines the semantic color system used throughout the component library.
 * Colors are defined as HSL values to work with CSS custom properties.
 */

export const colorTokens = {
  // Light theme colors
  light: {
    background: '0 0% 100%',
    foreground: '222.2 84% 4.9%',

    card: '0 0% 100%',
    cardForeground: '222.2 84% 4.9%',

    popover: '0 0% 100%',
    popoverForeground: '222.2 84% 4.9%',

    primary: '221.2 83.2% 53.3%',
    primaryForeground: '210 40% 98%',

    secondary: '210 40% 96%',
    secondaryForeground: '222.2 84% 4.9%',

    muted: '210 40% 96%',
    mutedForeground: '215.4 16.3% 46.9%',

    accent: '210 40% 96%',
    accentForeground: '222.2 84% 4.9%',

    destructive: '0 84.2% 60.2%',
    destructiveForeground: '210 40% 98%',

    border: '214.3 31.8% 91.4%',
    input: '214.3 31.8% 91.4%',
    ring: '221.2 83.2% 53.3%',

    // Surface layers
    surface1: '210 20% 98%',
    surface2: '210 16% 93%',
    surface3: '210 14% 89%',

    // Interactive states
    hover: '210 40% 92%',
    active: '210 40% 88%',

    // Status colors
    success: '142 76% 36%',
    successForeground: '210 40% 98%',
    warning: '38 92% 50%',
    warningForeground: '222.2 84% 4.9%',
    error: '0 84.2% 60.2%',
    errorForeground: '210 40% 98%',
    info: '199 89% 48%',
    infoForeground: '210 40% 98%',
  },

  // Dark theme colors
  dark: {
    background: '222.2 84% 4.9%',
    foreground: '210 40% 98%',

    card: '222.2 84% 4.9%',
    cardForeground: '210 40% 98%',

    popover: '222.2 84% 4.9%',
    popoverForeground: '210 40% 98%',

    primary: '217.2 91.2% 59.8%',
    primaryForeground: '222.2 84% 4.9%',

    secondary: '217.2 32.6% 17.5%',
    secondaryForeground: '210 40% 98%',

    muted: '217.2 32.6% 17.5%',
    mutedForeground: '215 20.2% 65.1%',

    accent: '217.2 32.6% 17.5%',
    accentForeground: '210 40% 98%',

    destructive: '0 62.8% 30.6%',
    destructiveForeground: '210 40% 98%',

    border: '217.2 32.6% 17.5%',
    input: '217.2 32.6% 17.5%',
    ring: '224.3 76.3% 94.1%',

    // Surface layers
    surface1: '217.2 32.6% 17.5%',
    surface2: '215 27.9% 16.9%',
    surface3: '215 25% 26.9%',

    // Interactive states
    hover: '217.2 32.6% 22.5%',
    active: '217.2 32.6% 27.5%',

    // Status colors
    success: '142 76% 45%',
    successForeground: '210 40% 98%',
    warning: '38 92% 60%',
    warningForeground: '222.2 84% 4.9%',
    error: '0 62.8% 30.6%',
    errorForeground: '210 40% 98%',
    info: '199 89% 58%',
    infoForeground: '210 40% 98%',
  },
} as const

export const colors = {
  getCSSVar: (colorName: string) => `hsl(var(--${colorName}))`,
  toKebabCase: (str: string) => str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`),
}

// Note: Theme colors are now handled through CSS layers in src/styles/themes.css
// This tokens object is kept for reference and potential future use cases
// The actual theming is handled through Tailwind CSS custom properties

export type ColorToken = keyof typeof colorTokens.light
