import React from 'react'
import { cn } from '@/helpers/utils'

interface NavbarItemProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean
  disabled?: boolean
  children: React.ReactNode
}

function NavbarItem({
  active = false,
  disabled = false,
  className,
  children,
  ...props
}: NavbarItemProps) {
  return (
    <div
      className={cn(
        'relative flex items-center px-4 py-3 text-sm font-medium transition-colors',
        'rounded-lg focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',

        'text-foreground hover:bg-accent hover:text-accent-foreground',

        active && [
          'bg-accent font-semibold text-accent-foreground shadow-sm',
          'before:absolute before:inset-y-0 before:left-0 before:w-1 before:rounded-r before:bg-primary',
        ],

        disabled && ['pointer-events-none cursor-not-allowed opacity-50'],

        '[&>a]:focus:outline-none [&>button]:focus:outline-none',

        className
      )}
      aria-current={active ? 'page' : undefined}
      {...props}
    >
      {children}
    </div>
  )
}

NavbarItem.displayName = 'NavbarItem'

export default NavbarItem
