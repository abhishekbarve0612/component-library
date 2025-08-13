'use client'

import React from 'react'
import { cn } from '@/helpers/utils'
import { useSelectContext } from './context'
import type { SelectItemProps } from './types'

function SelectItem({
  value,
  children,
  disabled = false,
  className,
  index = -1,
  optionId,
}: SelectItemProps) {
  const {
    value: selectedValue,
    setValue,
    setIsOpen,
    highlightedIndex,
    setHighlightedIndex,
  } = useSelectContext()
  const itemRef = React.useRef<HTMLButtonElement>(null)

  const handleClick = () => {
    if (disabled) return
    setValue(value)
    setIsOpen(false)
  }

  const handleMouseEnter = () => {
    if (!disabled && !isHighlighted) {
      setHighlightedIndex(index)
    }
  }

  const isSelected = selectedValue === value
  const isHighlighted = highlightedIndex === index

  // Scroll highlighted item into view
  React.useEffect(() => {
    if (isHighlighted && itemRef.current) {
      itemRef.current.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      })
    }
  }, [isHighlighted])


  return (
    <button
      ref={itemRef}
      id={optionId}
      className={cn(
        'relative w-full px-3 py-2 text-left text-sm transition-all duration-200 focus:outline-none',
        'hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-100',
        'active:scale-[0.98] transition-transform',
        {
          'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100': isHighlighted,
          'bg-blue-50 text-blue-900 dark:bg-blue-900/20 dark:text-blue-100': isSelected,
          'cursor-not-allowed opacity-50': disabled,
          'cursor-pointer': !disabled,
        },
        className
      )}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      disabled={disabled}
      type="button"
      role="option"
      aria-selected={isSelected}
      tabIndex={-1}
    >
      {children}
    </button>
  )
}

SelectItem.displayName = 'Select.Item'

export default SelectItem
