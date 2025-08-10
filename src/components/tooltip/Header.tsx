import React from 'react'
import { cn } from '@/helpers/utils'

export interface TooltipHeaderProps {
  children: React.ReactNode
  className?: string
}

function TooltipHeader({ children, className }: TooltipHeaderProps) {
  return (
    <div className={cn('font-semibold mb-1', className)}>
      {children}
    </div>
  )
}

TooltipHeader.displayName = 'Tooltip.Header'

export default TooltipHeader