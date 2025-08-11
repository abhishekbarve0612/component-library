import React, { useState, useCallback } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { HiMenu, HiX } from 'react-icons/hi'
import { cn } from '@/helpers/utils'
import NavbarContext from './context'
import NavbarBrand from './Brand'
import NavbarGroup from './Group'
import NavbarItem from './Item'

interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  breakpoint?: 'sm' | 'md' | 'lg' | 'xl'
  collapsible?: boolean
  fixed?: boolean
  bordered?: boolean
}

// Breakpoint mappings
const breakpointMap = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
} as const

function Navbar({
  breakpoint = 'md',
  collapsible = false,
  fixed = false,
  bordered = true,
  className,
  children,
  ...props
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const bp = breakpointMap[breakpoint]

  const toggleMobileMenu = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    },
    [isOpen]
  )

  // GSAP animation for mobile menu
  useGSAP(() => {
    const mobileMenu = document.querySelector('[data-mobile-menu]')
    if (!mobileMenu) return

    if (isOpen) {
      gsap.fromTo(
        mobileMenu,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' }
      )
    }
  }, [isOpen])

  return (
    <NavbarContext.Provider value={{ breakpoint, collapsible, isOpen }}>
      <nav
        role="navigation"
        aria-label="Main navigation"
        onKeyDown={handleKeyDown}
        className={cn(
          'relative w-full bg-background shadow-sm',

          bordered && 'border-b border-border',

          fixed && 'fixed top-0 right-0 left-0 z-50',

          className
        )}
        {...props}
      >
        {collapsible ? (
          <>
            {/* Mobile header */}
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex-1">
                {React.Children.toArray(children).find(
                  (child) => React.isValidElement(child) && child.type === NavbarBrand
                )}
              </div>

              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                onClick={toggleMobileMenu}
                className={cn(
                  'inline-flex items-center justify-center rounded-lg p-2',
                  'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                  'focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none',
                  'transition-colors duration-200',
                  `${bp}:hidden`
                )}
              >
                {isOpen ? (
                  <HiX className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <HiMenu className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>

            {/* Mobile menu */}
            <div
              id="mobile-navigation"
              data-mobile-menu
              className={cn(
                'flex-col border-t border-border py-2',
                `${bp}:hidden`,
                isOpen ? 'flex' : 'hidden'
              )}
              aria-hidden={!isOpen}
            >
              {React.Children.toArray(children).filter(
                (child) => React.isValidElement(child) && child.type !== NavbarBrand
              )}
            </div>

            {/* Desktop navigation */}
            <div className={cn('hidden items-center py-4', `${bp}:flex ${bp}:flex-row`)}>
              {children}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center py-4 md:flex-row">{children}</div>
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
