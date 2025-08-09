import React from 'react'
import { cn } from '@/helpers/utils'

export interface TooltipArrowProps {
  placement: 'top' | 'bottom' | 'left' | 'right'
  className?: string
  size?: number
  style?: React.CSSProperties
}

function TooltipArrow({ 
  placement, 
  className, 
  size = 8,
  style 
}: TooltipArrowProps) {
  return (
    <div
      className={cn(
        'absolute pointer-events-none -z-10',
        className
      )}
      style={style}
    >
      <svg
        width={size * 2}
        height={size * 2}
        viewBox="0 0 16 16"
        className={cn(
          'drop-shadow-sm',
          {
            'text-white': true, // Default color, can be overridden
          }
        )}
      >
        <path
          d="M8 0L16 8L8 16L0 8Z"
          fill="currentColor"
          className="drop-shadow-sm"
        />
      </svg>
    </div>
  )
}

TooltipArrow.displayName = 'Tooltip.Arrow'

export default TooltipArrow