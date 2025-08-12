'use client'

import { createContext, useContext } from 'react'

export interface SelectContextType {
  value: string
  setValue: (value: string) => void
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  highlightedIndex: number
  setHighlightedIndex: (index: number) => void
  options: string[]
  setOptions: (options: string[]) => void
}

const SelectContext = createContext<SelectContextType | null>(null)

export const useSelectContext = () => {
  const context = useContext(SelectContext)
  if (!context) {
    throw new Error('Select compound components must be used within Select')
  }
  return context
}

export default SelectContext
