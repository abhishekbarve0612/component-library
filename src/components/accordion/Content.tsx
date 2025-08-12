'use client'

import { useRef, useEffect } from 'react'
import { cn } from '@/helpers/utils'
import { useAccordionItemContext } from './context'
import type { AccordionContentProps } from './types'
import { animateAccordionOpen } from './animations'

function AccordionContent({ children, className }: AccordionContentProps) {
  const { isOpen } = useAccordionItemContext()
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const content = contentRef.current
    if (!content) return

    if (isOpen) {
      animateAccordionOpen(content)
    }
  }, [isOpen])

  return (
    <div
      ref={contentRef}
      className={cn(
        'accordion-content overflow-hidden',
        'border-t border-border',
        className
      )}
    >
      <div className="bg-background px-4 py-3 text-foreground">{children}</div>
    </div>
  )
}

AccordionContent.displayName = 'AccordionContent'

export default AccordionContent
