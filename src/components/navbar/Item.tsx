import React from 'react'
import { cn } from '@/helpers/utils'
import Anchor from '@/components/link'

interface NavbarItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean
  href: string
  children: React.ReactNode
}

function NavbarItem({ active = false, href, className, children, ...props }: NavbarItemProps) {
  return (
    <Anchor
      href={href}
      className={cn(
        'px-3 py-2 text-sm font-medium hover:text-blue-600',
        active ? 'font-semibold text-blue-600' : 'text-gray-700',
        className
      )}
      {...props}
    >
      {children}
    </Anchor>
  )
}

NavbarItem.displayName = 'NavbarItem'

export default NavbarItem
