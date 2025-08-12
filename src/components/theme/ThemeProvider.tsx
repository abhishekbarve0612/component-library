'use client'

import React, { useEffect, useState } from 'react'
import { generateCSSProperties } from '@/design-system/tokens'
import type { Theme, CustomTheme } from './context'
import ThemeContext from './context'

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  customTheme?: CustomTheme
  storageKey?: string
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  customTheme,
  storageKey = 'ui-theme',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem(storageKey) as Theme) || defaultTheme
    }
    return defaultTheme
  })

  const [customThemeState, setCustomTheme] = useState<CustomTheme | undefined>(customTheme)
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const root = window.document.documentElement

    // Remove existing theme classes
    root.classList.remove('light', 'dark')

    let systemTheme: 'light' | 'dark' = 'light'

    if (theme === 'system') {
      systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    } else {
      systemTheme = theme as 'light' | 'dark'
    }

    root.classList.add(systemTheme)
    setResolvedTheme(systemTheme)

    // Apply base theme CSS custom properties
    const baseProperties = generateCSSProperties(systemTheme)
    Object.entries(baseProperties).forEach(([property, value]) => {
      root.style.setProperty(property, value)
    })

    // Apply custom theme overrides if provided
    if (customThemeState?.colors) {
      Object.entries(customThemeState.colors).forEach(([colorKey, value]) => {
        if (value) {
          // Convert camelCase to kebab-case
          const cssVarName = colorKey.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
          root.style.setProperty(`--${cssVarName}`, value)
        }
      })
    }

    // Apply border radius if provided
    if (customThemeState?.borderRadius) {
      root.style.setProperty('--radius', customThemeState.borderRadius)
    } else {
      root.style.setProperty('--radius', '0.5rem')
    }
  }, [theme, customThemeState])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = () => {
      if (theme === 'system') {
        const systemTheme = mediaQuery.matches ? 'dark' : 'light'
        document.documentElement.classList.remove('light', 'dark')
        document.documentElement.classList.add(systemTheme)
        setResolvedTheme(systemTheme)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme)
      setTheme(newTheme)
    },
    resolvedTheme,
    customTheme: customThemeState,
    setCustomTheme: (newCustomTheme: CustomTheme) => {
      setCustomTheme(newCustomTheme)
    },
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
