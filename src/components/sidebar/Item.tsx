import { type ReactNode } from 'react'
import { cn } from '@/helpers/utils'
import Button, { type ButtonProps } from '@/components/button'

interface ItemProps extends ButtonProps {
  children: ReactNode
  active?: boolean
  disabled?: boolean
  onClick?: () => void
}

function Item({ children, active, disabled, onClick, ...props }: ItemProps) {
  return (
    <Button
      variant="default"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'relative flex w-full items-center rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors duration-200',
        'focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none',

        'text-foreground hover:bg-accent hover:text-accent-foreground',

        active && [
          'bg-accent font-semibold text-accent-foreground shadow-sm',
          'before:absolute before:inset-y-0 before:left-0 before:w-1 before:rounded-r before:bg-primary',
        ],

        disabled && 'pointer-events-none cursor-not-allowed opacity-50'
      )}
      {...props}
    >
      {children}
    </Button>
  )
}

Item.displayName = 'SidebarItem'

export default Item
