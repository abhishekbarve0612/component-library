'use client'
import { createContext } from 'react'

export interface TabsContextType {
  activeTab: string
  setActiveTab: (tab: string) => void
  orientation: 'horizontal' | 'vertical'
  size: 'sm' | 'md' | 'lg'
  baseId: string
  onKeyDown?: (e: KeyboardEvent, value: string) => void
}

const TabsContext = createContext<TabsContextType | undefined>(undefined)

export default TabsContext
