import React from 'react'
import { cn } from '@/helpers/utils'

export interface TooltipContentProps {
  children: React.ReactNode
  variant?: 'default' | 'dark' | 'light' | 'info' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const variantClasses = {
  default: 'bg-white text-gray-900 border border-gray-200 shadow-lg',
  dark: 'bg-gray-900 text-white border border-gray-700 shadow-lg',
  light: 'bg-gray-50 text-gray-900 border border-gray-200 shadow-md',
  info: 'bg-blue-50 text-blue-900 border border-blue-200 shadow-lg',
  success: 'bg-green-50 text-green-900 border border-green-200 shadow-lg',
  warning: 'bg-yellow-50 text-yellow-900 border border-yellow-200 shadow-lg',
  error: 'bg-red-50 text-red-900 border border-red-200 shadow-lg'
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