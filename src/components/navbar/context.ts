import { createContext, useContext } from 'react'

const NavbarContext = createContext<NavbarContextProps | null>(null)

interface NavbarContextProps {
  breakpoint?: string
  collapsible?: boolean
  isOpen?: boolean
}

export function useNavbarContext() {
  const ctx = useContext(NavbarContext)
  if (!ctx) throw new Error('Navbar compound components must be used inside <Navbar>')
  return ctx
}

export default NavbarContext
