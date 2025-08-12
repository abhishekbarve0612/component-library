import type { HTMLAttributes } from 'react'
import { cn } from '@/helpers/utils'

interface FooterProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'minimal' | 'accent'
  size?: 'sm' | 'md' | 'lg'
}

function Footer({ children, className, variant = 'default', size = 'md', ...props }: FooterProps) {
  const variants = {
    default: 'bg-muted border-t border-border',
    minimal: 'bg-transparent border-t border-border/20',
    accent: 'bg-primary text-primary-foreground border-t border-primary/20'
  }

  const sizes = {
    sm: 'py-4 text-xs',
    md: 'py-6 text-sm',
    lg: 'py-8 text-base'
  }

  return (
    <footer className={cn(variants[variant])} {...props}>
      <div className={cn('container mx-auto px-4', sizes[size], className)}>
        {children}
      </div>
    </footer>
  )
}

export default Footer
