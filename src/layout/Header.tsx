import type { HTMLAttributes } from 'react'
import { cn } from '@/helpers/utils'

interface HeaderProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'minimal' | 'accent'
}

function Header({ children, className, variant = 'default', ...props }: HeaderProps) {
  const variants = {
    default: 'bg-background border-b border-border',
    minimal: 'bg-transparent border-b border-border/20',
    accent: 'bg-primary text-primary-foreground border-b border-primary/20'
  }

  return (
    <header className={cn(variants[variant])} {...props}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 border-b bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>
      <div
        className={cn('container mx-auto flex items-center justify-between px-4 py-4', className)}
      >
        {children}
      </div>
    </header>
  )
}

export default Header
