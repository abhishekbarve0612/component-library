'use client'

import React, { useRef, useEffect } from 'react'
import { cn } from '@/helpers/utils'
import { useAccordionItemContext } from './context'
import type { AccordionTriggerProps } from './types'
import { BiChevronDownSquare } from 'react-icons/bi'
import { animateChevronRotation } from './animations'

function AccordionTrigger({ children, className, disabled = false }: AccordionTriggerProps) {
  const { isOpen, onToggle } = useAccordionItemContext()
  const iconRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const icon = iconRef.current
    if (!icon) return

    animateChevronRotation(icon, isOpen)
  }, [isOpen])

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault()

    if (disabled) {
      return
    }

    onToggle()
  }

  return (
    <summary
      className={cn(
        'flex w-full cursor-pointer items-center justify-between px-4 py-3 transition-colors duration-200',
        'bg-surface-1 text-foreground hover:bg-hover',
        'focus:ring-ring focus:ring-2 focus:outline-none focus:ring-inset',
        'list-none [&::-webkit-details-marker]:hidden',
        {
          'cursor-not-allowed opacity-50': disabled,
          'bg-surface2': isOpen,
        },
        className
      )}
      onClick={handleClick}
    >
      <span className="flex-1 select-none">{children}</span>
      <span ref={iconRef} className="inline-block">
        <BiChevronDownSquare className={cn('h-4 w-4')} />
      </span>
    </summary>
  )
}

AccordionTrigger.displayName = 'AccordionTrigger'

export default AccordionTrigger
