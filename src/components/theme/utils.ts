import { colorTokens } from '@/design-system/tokens'
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
  const { resolvedTheme } = useTheme()
  return colorTokens[resolvedTheme]
}
