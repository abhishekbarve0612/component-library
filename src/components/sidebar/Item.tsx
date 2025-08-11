import { type ReactNode } from 'react'
import { cn } from '@/helpers/utils'
import Button from '@/components/button'

interface ItemProps {
  children: ReactNode
  active?: boolean
  disabled?: boolean
  onClick?: () => void
}

function Item({ children, active, disabled, onClick }: ItemProps) {
  return (
    <Button
      variant="default"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'relative flex w-full items-center rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors duration-200',
        'focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:outline-none',

        'text-slate-700 hover:bg-slate-100 hover:text-slate-900',
        'dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100',

        active && [
          'bg-slate-100 font-semibold text-slate-900 shadow-sm',
          'dark:bg-slate-800 dark:text-slate-100',
          'before:absolute before:inset-y-0 before:left-0 before:w-1 before:rounded-r before:bg-slate-900',
          'dark:before:bg-slate-100',
        ],

        disabled && 'pointer-events-none cursor-not-allowed opacity-50'
      )}
    >
      {children}
    </Button>
  )
}

Item.displayName = 'SidebarItem'

export default Item
