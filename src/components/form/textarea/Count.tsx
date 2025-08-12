'use client'

import React from 'react'
import { useGSAP } from '@gsap/react'
import { cn } from '@/helpers/utils'
import { useTextareaContext } from './context'
import { countAnimation, nearLimitAnimation, overLimitAnimation } from './animations'

export interface TextareaCountProps {
  className?: string
  showMax?: boolean
  warningThreshold?: number
}

function TextareaCount({ className, showMax = true, warningThreshold = 0.8 }: TextareaCountProps) {
  const { value, maxLength } = useTextareaContext()
  const countRef = React.useRef<HTMLSpanElement>(null)

  const currentLength = value.length
  const isOverLimit = maxLength && currentLength > maxLength
  const isNearLimit = maxLength && currentLength >= maxLength * warningThreshold

  useGSAP(() => {
    if (!countRef.current || !maxLength) return

    if (isOverLimit) {
      overLimitAnimation(countRef.current)
    } else if (isNearLimit) {
      nearLimitAnimation(countRef.current)
    } else {
      countAnimation(countRef.current)
    }
  }, [isOverLimit, isNearLimit, maxLength])

  if (!maxLength && !showMax) return null

  const displayText =
    showMax && maxLength ? `${currentLength}/${maxLength}` : currentLength.toString()

  return (
    <div className="flex justify-end">
      <span
        ref={countRef}
        className={cn(
          'text-xs transition-colors',
          {
            'text-gray-500': !isNearLimit && !isOverLimit,
            'font-medium text-orange-600': isNearLimit && !isOverLimit,
            'font-semibold text-red-600': isOverLimit,
          },
          className
        )}
        aria-label={`Character count: ${displayText}`}
      >
        {displayText}
      </span>
    </div>
  )
}

TextareaCount.displayName = 'Textarea.Count'

export default TextareaCount
