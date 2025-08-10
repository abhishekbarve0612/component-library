import { createContext, useContext } from 'react'
import type { Variant } from './types'

const NavbarContext = createContext<NavbarContextProps | null>(null)

interface NavbarContextProps {
  variant: Variant
  breakpoint?: string
  collapsible?: boolean
}

export function useNavbarContext() {
  const ctx = useContext(NavbarContext)
  if (!ctx) throw new Error('Navbar compound components must be used inside <Navbar>')
  return ctx
}

export default NavbarContext
