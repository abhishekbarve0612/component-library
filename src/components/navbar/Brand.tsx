import React from 'react'
import { cn } from '@/helpers/utils'

function NavbarBrand({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex items-center text-lg font-bold',
        'text-foreground',
        'px-6 py-3',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

NavbarBrand.displayName = 'NavbarBrand'

export default NavbarBrand
