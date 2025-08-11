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
        'rounded-lg focus-within:ring-2 focus-within:ring-slate-500 focus-within:ring-offset-2',

        'text-slate-700 hover:bg-slate-100 hover:text-slate-900',
        'dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100',

        active && [
          'bg-slate-100 font-semibold text-slate-900 shadow-sm',
          'dark:bg-slate-800 dark:text-slate-100',
          'before:absolute before:inset-y-0 before:left-0 before:w-1 before:rounded-r before:bg-slate-900',
          'dark:before:bg-slate-100',
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
