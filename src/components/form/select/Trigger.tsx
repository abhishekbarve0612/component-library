'use client'

import React from 'react'
import { FaCircleChevronDown } from 'react-icons/fa6'
import { cn } from '@/helpers/utils'
import { useSelectContext } from './context'
import type { SelectTriggerProps } from './types'

function SelectTrigger({ children, className = '' }: SelectTriggerProps) {
  const { isOpen, setIsOpen, highlightedIndex } = useSelectContext()

  // Generate IDs for ARIA relationships
  const triggerId = React.useId()
  const listboxId = `${triggerId}-listbox`
  const activeDescendant =
    highlightedIndex >= 0 ? `${triggerId}-option-${highlightedIndex}` : undefined

  return (
    <button
      id={triggerId}
      className={cn(
        'flex w-full cursor-pointer items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm transition-all duration-200 outline-none',
        'hover:border-slate-300 hover:bg-slate-50',
        'focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
        'active:scale-[0.99] transition-transform',
        'dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600 dark:hover:bg-slate-800',
        {
          'border-blue-500 ring-2 ring-blue-500/20': isOpen,
        },
        className
      )}
      onClick={() => setIsOpen(!isOpen)}
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-controls={isOpen ? listboxId : undefined}
      aria-activedescendant={activeDescendant}
      role="combobox"
      type="button"
      tabIndex={0}
    >
      {children}
      <div className={cn('transition-transform duration-200', { 'rotate-180': isOpen })}>
        <FaCircleChevronDown
          className="ml-auto inline-block h-4 w-4 text-slate-400"
          aria-hidden="true"
        />
      </div>
    </button>
  )
}

SelectTrigger.displayName = 'Select.Trigger'

export default SelectTrigger
