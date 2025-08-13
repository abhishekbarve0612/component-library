'use client'

import React, { useState, useRef, useEffect } from 'react'
import { cn } from '@/helpers/utils'
import SelectItem from './Item'
import SelectTrigger from './Trigger'
import SelectValue from './Value'
import SelectContent from './Content'
import SelectContext from './context'
import type { SelectProps } from './types'

function Select({
  value,
  onValueChange,
  children,
  className,
  disabled = false,
  ...props
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [options, setOptions] = useState<string[]>([])
  const selectRef = useRef<HTMLDivElement>(null)

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setHighlightedIndex(-1)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Reset highlighted index when opening/closing
  useEffect(() => {
    if (isOpen) {
      // Set initial highlighted index to current value or first option
      const currentIndex = options.findIndex((option) => option === value)
      setHighlightedIndex(currentIndex >= 0 ? currentIndex : 0)
    } else {
      setHighlightedIndex(-1)
    }
  }, [isOpen, options, value])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (disabled) return

      // Only handle keys when select is focused or open
      const isSelectFocused = selectRef.current?.contains(document.activeElement)
      if (!isSelectFocused && !isOpen) return

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault()
          if (!isOpen) {
            setIsOpen(true)
          } else {
            setHighlightedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0))
          }
          break

        case 'ArrowUp':
          event.preventDefault()
          if (!isOpen) {
            setIsOpen(true)
          } else {
            setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1))
          }
          break

        case 'Enter':
        case ' ':
          event.preventDefault()
          if (!isOpen) {
            setIsOpen(true)
          } else if (highlightedIndex >= 0 && options[highlightedIndex]) {
            onValueChange(options[highlightedIndex])
            setIsOpen(false)
          }
          break

        case 'Escape':
          event.preventDefault()
          setIsOpen(false)
          // Return focus to trigger
          selectRef.current?.querySelector<HTMLButtonElement>('[role="combobox"]')?.focus()
          break

        case 'Home':
          if (isOpen) {
            event.preventDefault()
            setHighlightedIndex(0)
          }
          break

        case 'End':
          if (isOpen) {
            event.preventDefault()
            setHighlightedIndex(options.length - 1)
          }
          break

        case 'Tab':
          // Allow tab to close dropdown and move focus
          if (isOpen) {
            setIsOpen(false)
          }
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [disabled, isOpen, options, highlightedIndex, onValueChange])

  // Prevent opening when disabled
  const contextValue = React.useMemo(
    () => ({
      value,
      setValue: disabled ? () => {} : onValueChange,
      isOpen: disabled ? false : isOpen,
      setIsOpen: disabled ? () => {} : setIsOpen,
      highlightedIndex,
      setHighlightedIndex: disabled ? () => {} : setHighlightedIndex,
      options,
      setOptions,
    }),
    [value, onValueChange, isOpen, disabled, highlightedIndex, options]
  )

  return (
    <SelectContext.Provider value={contextValue}>
      <div className={cn('relative w-full', className)} ref={selectRef} {...props}>
        {children}
      </div>
    </SelectContext.Provider>
  )
}

Select.Trigger = SelectTrigger
Select.Value = SelectValue
Select.Content = SelectContent
Select.Item = SelectItem

export default Select
