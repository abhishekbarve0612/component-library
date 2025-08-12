'use client'

import type { ColorToken } from '@/design-system/tokens'
import { createContext, useContext } from 'react'

export type Theme = 'light' | 'dark' | 'system'

export interface CustomTheme {
  colors?: Partial<Record<ColorToken, string>>
  borderRadius?: string
}

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: 'light' | 'dark'
  customTheme?: CustomTheme
  setCustomTheme: (theme: CustomTheme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export default ThemeContext
