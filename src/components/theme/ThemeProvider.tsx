'use client'

import React, { useEffect, useState } from 'react'
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

    // Only add dark class if dark theme - light theme is the default in CSS
    if (systemTheme === 'dark') {
      root.classList.add('dark')
    }
    
    setResolvedTheme(systemTheme)

    // Apply custom theme overrides if provided (only for custom properties not handled by CSS)
    if (customThemeState?.colors) {
      Object.entries(customThemeState.colors).forEach(([colorKey, value]) => {
        if (value) {
          // Convert camelCase to kebab-case
          const cssVarName = colorKey.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
          root.style.setProperty(`--${cssVarName}`, value)
        }
      })
    }

    // Apply border radius if provided (override the CSS default)
    if (customThemeState?.borderRadius) {
      root.style.setProperty('--radius', customThemeState.borderRadius)
    }
  }, [theme, customThemeState])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = () => {
      if (theme === 'system') {
        const systemTheme = mediaQuery.matches ? 'dark' : 'light'
        document.documentElement.classList.remove('light', 'dark')
        if (systemTheme === 'dark') {
          document.documentElement.classList.add('dark')
        }
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
