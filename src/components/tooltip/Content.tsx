import React from 'react'
import { cn } from '@/helpers/utils'

export interface TooltipContentProps {
  children: React.ReactNode
  variant?: 'default' | 'dark' | 'light' | 'info' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const variantClasses = {
  default: 'bg-popover text-popover-foreground border border-border shadow-lg',
  dark: 'bg-surface3 text-background border border-border shadow-lg',
  light: 'bg-surface1 text-foreground border border-border shadow-md',
  info: 'bg-info/10 text-info-foreground border border-info/20 shadow-lg',
  success: 'bg-success/10 text-success-foreground border border-success/20 shadow-lg',
  warning: 'bg-warning/10 text-warning-foreground border border-warning/20 shadow-lg',
  error: 'bg-destructive/10 text-destructive-foreground border border-destructive/20 shadow-lg'
}

const sizeClasses = {
  sm: 'px-2 py-1 text-xs max-w-xs',
  md: 'px-3 py-2 text-sm max-w-sm',
  lg: 'px-4 py-3 text-base max-w-md'
}

function TooltipContent({ 
  children, 
  variant = 'default', 
  size = 'md',
  className 
}: TooltipContentProps) {
  return (
    <div
      className={cn(
        'rounded-md backdrop-blur-sm relative',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </div>
  )
}

TooltipContent.displayName = 'Tooltip.Content'

export default TooltipContent