'use client'

import React, { useRef } from 'react'
import Tooltip from '../tooltip'
import Button from '../button'
import { useToolbarContext } from './context'
import { cn } from '@/helpers/utils'

export interface ToolbarItemProps {
  id: string
  label: string
  icon: React.ReactNode
  disabled?: boolean
  index?: number
  onSelect?: (id: string) => void
  ref?: React.Ref<HTMLButtonElement>
}

function Item({ id, label, icon, disabled = false, index = 0, onSelect, ref }: ToolbarItemProps) {
  const { variant, focusedIndex, activeItems } = useToolbarContext()
  const internalRef = useRef<HTMLButtonElement>(null)

  const isItemActive = activeItems.includes(id)

  const mergedRef = (node: HTMLButtonElement | null) => {
    internalRef.current = node
    if (typeof ref === 'function') {
      ref(node)
    } else if (ref && 'current' in ref) {
      ref.current = node
    }
  }

  const handleClick = () => {
    if (disabled) return
    onSelect?.(id)
  }

  return (
    <>
      <Button
        ref={mergedRef}
        id={id}
        variant="ghost"
        size="sm"
        disabled={disabled}
        active={isItemActive}
        onClick={handleClick}
        aria-pressed={isItemActive}
        tabIndex={focusedIndex === index ? 0 : -1}
        className={cn(
          'flex items-center justify-center rounded-md transition-colors',
          'hover:hover:bg-hover hover:hover:text-foreground',
          'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none',
          'disabled:pointer-events-none disabled:opacity-50',
          isItemActive &&
            'bg-surface2 text-foreground shadow-sm',
          variant === 'minimal' ? 'h-9 w-9 p-0' : 'min-h-9 gap-2 px-3 py-2'
        )}
      >
        <span className="flex items-center justify-center">{icon}</span>
        {variant !== 'minimal' && (
          <span className="text-sm font-medium whitespace-nowrap">{label}</span>
        )}
      </Button>
      {variant === 'minimal' && (
        <Tooltip
          id={`${id}-tooltip`}
          targetRef={internalRef as React.RefObject<HTMLElement>}
          trigger="hover"
          placement="top"
          delay={500}
        >
          <Tooltip.Content>{label}</Tooltip.Content>
        </Tooltip>
      )}
    </>
  )
}

Item.displayName = 'Toolbar.Item'

export default Item
