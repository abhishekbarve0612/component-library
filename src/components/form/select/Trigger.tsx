import React from 'react'
import { FaCircleChevronDown } from 'react-icons/fa6'
import { cn } from '@/helpers/utils'
import { useSelectContext } from './context'

interface SelectTriggerProps {
  children: React.ReactNode
  className?: string
}

function SelectTrigger({ children, className = '' }: SelectTriggerProps) {
  const { isOpen, setIsOpen, options, highlightedIndex } = useSelectContext()
  
  // Generate IDs for ARIA relationships
  const triggerId = React.useId()
  const listboxId = `${triggerId}-listbox`
  const activeDescendant = highlightedIndex >= 0 ? `${triggerId}-option-${highlightedIndex}` : undefined

  return (
    <button
      id={triggerId}
      className={cn(
        `flex items-center justify-between w-full rounded-md border 
        border-gray-300 bg-white/70 backdrop-blur-sm px-3 py-2
        text-sm cursor-pointer transition-all outline-none
        focus:border-blue-500 focus:ring-2 focus:ring-blue-200`,
        {
          'border-blue-500 ring-2 ring-blue-200': isOpen,
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
      <FaCircleChevronDown 
        className={cn(
          'inline-block ml-auto w-4 h-4 text-gray-500 transition-transform',
          isOpen && 'rotate-180'
        )} 
        aria-hidden="true"
      />
    </button>
  )
}

SelectTrigger.displayName = 'Select.Trigger'

export default SelectTrigger