import React from 'react'
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
}

const Item = React.forwardRef<HTMLButtonElement, ToolbarItemProps>(
  ({ id, label, icon, disabled = false, index = 0, onSelect }, ref) => {
    const { variant, focusedIndex, activeIndex } = useToolbarContext()

    const handleClick = () => {
      if (disabled) return
      onSelect?.(id)
    }

    return (
      <>
        <Button
          ref={ref}
          id={id}
          variant="ghost"
          size="sm"
          disabled={disabled}
          active={activeIndex === index}
          onClick={handleClick}
          aria-pressed={activeIndex === index}
          tabIndex={focusedIndex === index ? 0 : -1}
          className={cn(
            'flex items-center justify-center rounded-md transition-colors',
            'hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-100',
            'focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 focus-visible:outline-none',
            'disabled:pointer-events-none disabled:opacity-50',
            activeIndex === index &&
              'bg-slate-200 text-slate-900 shadow-sm dark:bg-slate-700 dark:text-slate-100',
            variant === 'minimal' ? 'h-9 w-9 p-0' : 'min-h-9 gap-2 px-3 py-2'
          )}
        >
          <span className="flex items-center justify-center">{icon}</span>
          {variant !== 'minimal' && (
            <span className="hidden text-sm font-medium whitespace-nowrap sm:inline">{label}</span>
          )}
        </Button>
        {variant === 'minimal' && (
          <Tooltip id={`${id}-tooltip`}>
            <Tooltip.Content>{label}</Tooltip.Content>
          </Tooltip>
        )}
      </>
    )
  }
)

Item.displayName = 'Toolbar.Item'

export default Item
