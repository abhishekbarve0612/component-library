import React from 'react'
import { cn } from '@/helpers/utils'
import { useSelectContext } from './context'

export interface SelectItemProps {
  value: string
  children: React.ReactNode
  disabled?: boolean
  className?: string
  index?: number
  optionId?: string
}

function SelectItem({ value, children, disabled = false, className, index = -1, optionId }: SelectItemProps) {
  const { value: selectedValue, setValue, setIsOpen, highlightedIndex, setHighlightedIndex } = useSelectContext()
  const itemRef = React.useRef<HTMLButtonElement>(null)
  
  const handleClick = () => {
    if (disabled) return
    setValue(value)
    setIsOpen(false)
  }

  const handleMouseEnter = () => {
    if (!disabled) {
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
        behavior: 'smooth'
      })
    }
  }, [isHighlighted])

  return (
    <button
      ref={itemRef}
      id={optionId}
      className={cn(
        'w-full px-3 py-2 text-sm text-left transition-colors focus:outline-none',
        {
          'bg-blue-50 text-blue-600': isSelected,
          'bg-gray-100': isHighlighted && !isSelected,
          'hover:bg-gray-100': !disabled && !isHighlighted,
          'opacity-50 cursor-not-allowed': disabled,
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