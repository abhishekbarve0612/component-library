import React from 'react'
import { cn } from '@/helpers/utils'

function NavbarBrand({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex items-center px-4 py-2 text-lg font-bold', className)} {...props} />
  )
}

NavbarBrand.displayName = 'NavbarBrand'

export default NavbarBrand
