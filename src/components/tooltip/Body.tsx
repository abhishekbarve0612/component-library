import React from 'react'
import { cn } from '@/helpers/utils'

export interface TooltipBodyProps {
  children: React.ReactNode
  className?: string
}

function TooltipBody({ children, className }: TooltipBodyProps) {
  return (
    <div className={cn('text-sm leading-relaxed', className)}>
      {children}
    </div>
  )
}

TooltipBody.displayName = 'Tooltip.Body'

export default TooltipBody