import React, { useState } from 'react'
import { cn } from '@/helpers/utils'
import type { Variant } from './types'
import NavbarContext from './context'
import NavbarBrand from './Brand'
import NavbarGroup from './Group'
import NavbarItem from './Item'

interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  variant?: Variant
  breakpoint?: 'sm' | 'md' | 'lg' | 'xl'
  collapsible?: boolean
}

function Navbar({
  variant = 'horizontal',
  breakpoint = 'md',
  collapsible = false,
  className,
  children,
  ...props
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <NavbarContext.Provider value={{ variant, breakpoint, collapsible }}>
      <nav
        className={cn(
          'w-full border-b border-gray-200 bg-white',
          variant === 'horizontal' ? 'flex flex-col' : 'flex h-full w-64 flex-col border-r',
          className
        )}
        {...props}
      >
        {collapsible && variant === 'horizontal' ? (
          <>
            <div className="flex items-center justify-between border-b p-4">
              <div className="flex-1">{(children as React.ReactNode[])?.[0]}</div>
              <button
                className="block rounded p-2 hover:bg-gray-100 md:hidden"
                onClick={() => setIsOpen((prev) => !prev)}
              >
                ☰
              </button>
            </div>
            <div className={cn('flex-1 flex-col md:flex md:flex-row', isOpen ? 'flex' : 'hidden')}>
              {React.Children.toArray(children).slice(1)}
            </div>
          </>
        ) : (
          <div
            className={cn(
              'flex',
              variant === 'horizontal'
                ? `flex-col ${breakpoint}:flex-row items-center ${breakpoint}:items-center`
                : 'flex-col'
            )}
          >
            {children}
          </div>
        )}
      </nav>
    </NavbarContext.Provider>
  )
}

Navbar.Brand = NavbarBrand
Navbar.Group = NavbarGroup
Navbar.Item = NavbarItem

Navbar.displayName = 'Navbar'

export default Navbar
