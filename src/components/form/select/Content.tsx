import React from 'react'
import { cn } from '@/helpers/utils'
import type { SelectItemProps } from './Item'

export interface SelectContentProps {
  children: React.ReactNode
  isOpen?: boolean
  setIsOpen?: (open: boolean) => void
  onValueChange?: (value: string) => void
}

function SelectContent({ children, isOpen, setIsOpen, onValueChange }: SelectContentProps) {
  if (!isOpen) return null

  return (
    <div className={cn('absolute z-10 w-full bg-white rounded-md shadow-md')}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<SelectItemProps>, {
            setIsOpen,
            onValueChange,
          })
        }
        return child
      })}
    </div>
  )
}

SelectContent.displayName = 'Select.Content'

export default SelectContent