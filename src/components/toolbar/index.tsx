'use client'

import React, { useState, useRef, useCallback, type KeyboardEvent } from 'react'
import { cn } from '@/helpers/utils'
import ToolbarContext from './context'
import type { ToolbarOrientation, ToolbarVariant } from './types'
import Item, { type ToolbarItemProps } from './Item'
import Divider from './Divider'

interface ToolbarProps {
  orientation?: ToolbarOrientation
  variant?: ToolbarVariant
  onChange?: (id: string) => void
  activeItems?: string[]
  children: React.ReactNode
  className?: string
}

function Toolbar({
  orientation = 'horizontal',
  variant = 'compact',
  onChange,
  activeItems = [],
  children,
  className,
}: ToolbarProps) {
  const [focusedIndex, setFocusedIndex] = useState(0)
  const [activeIndex, setActiveIndex] = useState(-1)
  const itemRefs = useRef<HTMLButtonElement[]>([])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const itemCount = itemRefs.current.length
      if (itemCount === 0) return

      let newIndex = focusedIndex

      switch (e.key) {
        case 'ArrowRight':
          if (orientation === 'horizontal') {
            newIndex = (focusedIndex + 1) % itemCount
          }
          break
        case 'ArrowLeft':
          if (orientation === 'horizontal') {
            newIndex = (focusedIndex - 1 + itemCount) % itemCount
          }
          break
        case 'ArrowDown':
          if (orientation === 'vertical') {
            newIndex = (focusedIndex + 1) % itemCount
          }
          break
        case 'ArrowUp':
          if (orientation === 'vertical') {
            newIndex = (focusedIndex - 1 + itemCount) % itemCount
          }
          break
        case 'Tab':
          if (e.shiftKey) {
            // Shift+Tab: Previous item, or leave toolbar if on first item
            if (focusedIndex === 0) {
              // Let it naturally leave the toolbar
              return
            }
            newIndex = focusedIndex - 1
          } else {
            // Tab: Next item, or leave toolbar if on last item
            if (focusedIndex === itemCount - 1) {
              // Let it naturally leave the toolbar
              return
            }
            newIndex = focusedIndex + 1
          }
          break
        case 'Home':
          newIndex = 0
          break
        case 'End':
          newIndex = itemCount - 1
          break
        default:
          return
      }

      if (newIndex !== focusedIndex) {
        e.preventDefault()
        setFocusedIndex(newIndex)
        itemRefs.current[newIndex]?.focus()
      }
    },
    [focusedIndex, orientation]
  )

  return (
    <ToolbarContext.Provider
      value={{
        orientation,
        variant,
        focusedIndex,
        activeIndex,
        activeItems,
      }}
    >
      <div
        role="toolbar"
        aria-orientation={orientation}
        onKeyDown={handleKeyDown}
        className={cn(
          'inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white p-1 shadow-sm',
          'focus-within:ring-2 focus-within:ring-slate-500 focus-within:ring-offset-2',
          'dark:border-slate-700 dark:bg-slate-900',
          orientation === 'horizontal' ? 'flex-row' : 'flex-col',
          className
        )}
      >
        {React.Children.map(children, (child, childIndex) => {
          if (!React.isValidElement(child)) return child

          // Skip dividers
          if (child.type === Divider) {
            return child
          }

          // Calculate item index (excluding dividers)
          const itemIndex = React.Children.toArray(children)
            .slice(0, childIndex)
            .filter((c) => React.isValidElement(c) && c.type !== Divider).length

          // Get user's original onSelect if they provided one
          const userOnSelect = (child.props as ToolbarItemProps).onSelect

          return React.cloneElement(child, {
            ref: (el: HTMLButtonElement | null) => {
              if (el) {
                itemRefs.current[itemIndex] = el
              }
            },
            index: itemIndex,
            onSelect: (id: string) => {
              // Set active state for keyboard navigation
              setActiveIndex(itemIndex)

              // Call user's handler first
              userOnSelect?.(id)

              // Call parent onChange if provided (optional)
              onChange?.(id)
            },
          } as ToolbarItemProps)
        })}
      </div>
    </ToolbarContext.Provider>
  )
}

Toolbar.displayName = 'Toolbar'
Toolbar.Item = Item
Toolbar.Divider = Divider

export default Toolbar
