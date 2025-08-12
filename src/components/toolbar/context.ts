'use client'
import { createContext, useContext } from 'react'
import type { ToolbarOrientation, ToolbarVariant } from './types'

export interface ToolbarContextType {
  orientation: ToolbarOrientation
  variant: ToolbarVariant
  focusedIndex: number
  activeIndex: number
  activeItems: string[]
}

const ToolbarContext = createContext<ToolbarContextType | null>(null)

export const useToolbarContext = () => {
  const context = useContext(ToolbarContext)
  if (!context) {
    throw new Error('Toolbar components must be used within Toolbar')
  }
  return context
}

export default ToolbarContext
