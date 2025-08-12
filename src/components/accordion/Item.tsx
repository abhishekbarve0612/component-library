import React, { useCallback, useRef, useEffect } from 'react'
import { cn } from '@/helpers/utils'
import { useAccordionContext, AccordionItemContext } from './context'
import type { AccordionItemProps } from './types'

function AccordionItem({ children, className, value, disabled = false }: AccordionItemProps) {
  const { multiple, collapsible, value: accordionValue, onValueChange } = useAccordionContext()
  const detailsRef = useRef<HTMLDetailsElement>(null)

  const isOpen = multiple
    ? Array.isArray(accordionValue) && accordionValue.includes(value)
    : accordionValue === value

  const onToggle = useCallback(() => {
    if (disabled) return

    if (multiple) {
      const currentValues = Array.isArray(accordionValue) ? accordionValue : []
      const newValues = isOpen
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value]
      onValueChange?.(newValues)
    } else {
      const newValue = isOpen && collapsible ? '' : value
      onValueChange?.(newValue)
    }
  }, [disabled, multiple, accordionValue, isOpen, value, collapsible, onValueChange])

  useEffect(() => {
    const details = detailsRef.current
    if (details && details.open !== isOpen) {
      const originalToggle = details.ontoggle
      details.ontoggle = null
      details.open = isOpen
      details.ontoggle = originalToggle
    }
  }, [isOpen])

  const handleToggle = (event: React.SyntheticEvent<HTMLDetailsElement>) => {
    event.preventDefault()
  }

  const itemContextValue = {
    itemValue: value,
    isOpen,
    onToggle,
  }

  return (
    <AccordionItemContext.Provider value={itemContextValue}>
      <details
        ref={detailsRef}
        open={isOpen}
        onToggle={handleToggle}
        className={cn(
          'group overflow-hidden rounded-md border border-gray-200 dark:border-gray-700',
          '[&_summary]:list-none [&_summary]:outline-none',
          '[&_summary::-webkit-details-marker]:hidden',
          {
            'cursor-not-allowed opacity-50': disabled,
          },
          className
        )}
      >
        {children}
      </details>
    </AccordionItemContext.Provider>
  )
}

AccordionItem.displayName = 'AccordionItem'

export default AccordionItem
