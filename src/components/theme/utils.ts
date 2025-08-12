'use client'

import { useTheme } from './context'

export function useThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light')
    } else if (theme === 'light') {
      setTheme('system')
    } else {
      setTheme('dark')
    }
  }

  return { toggleTheme }
}

export function useThemeColors() {
  // Since colors are now handled through CSS custom properties,
  // we can access them via getComputedStyle if needed
  if (typeof window !== 'undefined') {
    const root = document.documentElement
    const computedStyle = getComputedStyle(root)
    
    return {
      background: computedStyle.getPropertyValue('--background'),
      foreground: computedStyle.getPropertyValue('--foreground'),
      primary: computedStyle.getPropertyValue('--primary'),
      // Add more as needed, but prefer using CSS classes directly
    }
  }
  
  return {}
}
