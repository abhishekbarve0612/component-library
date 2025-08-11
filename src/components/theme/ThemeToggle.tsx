import { HiSun, HiMoon, HiDesktopComputer } from 'react-icons/hi'
import { useTheme, type Theme } from './context'
import Button from '../button'

interface ThemeToggleProps {
  variant?: 'icon' | 'text' | 'dropdown'
  size?: 'sm' | 'default' | 'lg'
  className?: string
}

export function ThemeToggle({ variant = 'icon', size = 'default', className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()

  if (variant === 'dropdown') {
    return (
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as Theme)}
        className={`border-border bg-background text-foreground rounded-md border px-3 py-1 text-sm ${className}`}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
    )
  }

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <HiSun className="h-4 w-4" />
      case 'dark':
        return <HiMoon className="h-4 w-4" />
      default:
        return <HiDesktopComputer className="h-4 w-4" />
    }
  }

  const getLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light'
      case 'dark':
        return 'Dark'
      default:
        return 'System'
    }
  }

  const cycleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  if (variant === 'text') {
    return (
      <Button
        variant="ghost"
        size={size}
        onClick={cycleTheme}
        className={`gap-2 ${className}`}
        aria-label={`Current theme: ${getLabel()}. Click to cycle theme.`}
      >
        {getIcon()}
        {getLabel()}
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size={size}
      onClick={cycleTheme}
      className={`aspect-square p-2 ${className}`}
      aria-label={`Current theme: ${getLabel()}. Click to cycle theme.`}
    >
      {getIcon()}
    </Button>
  )
}

export default ThemeToggle
