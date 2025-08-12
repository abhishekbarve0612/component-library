'use client'

import { useState, useCallback } from 'react'
import { cn } from '@/helpers/utils'
import { AccordionContext } from './context'
import type { AccordionProps } from './types'
import AccordionItem from './Item'
import AccordionTrigger from './Trigger'
import AccordionContent from './Content'

function Accordion({
  children,
  className,
  multiple = false,
  collapsible = true,
  defaultValue,
  value: controlledValue,
  onValueChange,
}: AccordionProps) {
  const [internalValue, setInternalValue] = useState<string | string[]>(() => {
    if (controlledValue !== undefined) return controlledValue
    if (defaultValue !== undefined) return defaultValue
    return multiple ? [] : ''
  })

  const isControlled = controlledValue !== undefined

  const currentValue = isControlled ? controlledValue : internalValue

  const handleValueChange = useCallback(
    (newValue: string | string[]) => {
      if (!isControlled) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    },
    [isControlled, onValueChange]
  )

  const contextValue = {
    multiple,
    collapsible,
    defaultValue,
    value: currentValue,
    onValueChange: handleValueChange,
  }

  return (
    <AccordionContext.Provider value={contextValue}>
      <div className={cn('space-y-2', className)}>{children}</div>
    </AccordionContext.Provider>
  )
}

Accordion.displayName = 'Accordion'

Accordion.Item = AccordionItem
Accordion.Trigger = AccordionTrigger
Accordion.Content = AccordionContent

export default Accordion
