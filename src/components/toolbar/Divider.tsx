'use client'
import React from 'react'
import { cn } from '@/helpers/utils'
import { useContext } from 'react'
import ToolbarContext from './context'

const useToolbarContext = () => {
  const context = useContext(ToolbarContext)
  if (!context) {
    throw new Error('Toolbar.Divider must be used within Toolbar')
  }
  return context
}

export interface ToolbarDividerProps {
  className?: string
}

const Divider: React.FC<ToolbarDividerProps> = ({ className }) => {
  const { orientation } = useToolbarContext()

  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        'flex-shrink-0 bg-slate-300 dark:bg-slate-700',
        orientation === 'horizontal' ? 'mx-1 h-6 w-px' : 'my-1 h-px w-full',
        className
      )}
    />
  )
}

Divider.displayName = 'Toolbar.Divider'

export default Divider
