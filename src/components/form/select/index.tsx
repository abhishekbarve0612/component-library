'use client'

import React, { useState, useRef, useEffect } from 'react'
import styles from './select.module.css'
import SelectItem, { type SelectItemProps } from './Item'
import SelectTrigger from './Trigger'
import SelectValue from './Value'
import SelectContent from './Content'
import SelectContext from './context'
import type { SelectContentProps } from './Content'

interface SelectProps {
  value: string
  onValueChange: (value: string) => void
  children: React.ReactNode
}

function Select({ value, onValueChange, children, ...props }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setIsOpen(!isOpen)
    } else if (event.key === 'Escape') {
      setIsOpen(false)
    }
  }

  return (
    <SelectContext.Provider value={{ value, setValue: onValueChange, isOpen, setIsOpen }}>
      <div className={styles.select} ref={selectRef} {...props}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<SelectContentProps>, {
              isOpen,
              setIsOpen,
              onValueChange,
              children: React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                  return React.cloneElement(child as React.ReactElement<SelectItemProps>, {
                    setIsOpen,
                    onValueChange,
                    onKeyDown: handleKeyDown,
                    selectedValue: value,
                  })
                }
                return child
              }),
            })
          }
          return child
        })}
      </div>
    </SelectContext.Provider>
  )
}

Select.Trigger = SelectTrigger
Select.Value = SelectValue
Select.Content = SelectContent
Select.Item = SelectItem

export default Select
