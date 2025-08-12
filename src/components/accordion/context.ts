'use client'

import { createContext, useContext } from 'react'

export interface AccordionContextValue {
  multiple?: boolean
  collapsible?: boolean
  defaultValue?: string | string[]
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
}

export interface AccordionItemContextValue {
  itemValue: string
  isOpen: boolean
  onToggle: () => void
}

export const AccordionContext = createContext<AccordionContextValue>({
  multiple: false,
  collapsible: true
})

export const AccordionItemContext = createContext<AccordionItemContextValue | null>(null)

export const useAccordionContext = () => {
  const context = useContext(AccordionContext)
  return context
}

export const useAccordionItemContext = () => {
  const context = useContext(AccordionItemContext)
  if (!context) {
    throw new Error('AccordionItem components must be used within an AccordionItem')
  }
  return context
}

export default AccordionContext