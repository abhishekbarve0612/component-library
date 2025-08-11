import React from 'react'
import { cn } from '@/helpers/utils'

interface NavbarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'left' | 'center' | 'right'
}

function NavbarGroup({ align = 'left', className, children, ...props }: NavbarGroupProps) {
  const alignmentClasses = {
    left: '',
    center: 'mx-auto',
    right: 'ml-auto',
  }

  return (
    <div
      className={cn(
        'flex items-center',
        'flex-row gap-2 px-6 py-2',
        alignmentClasses[align],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

NavbarGroup.displayName = 'NavbarGroup'

export default NavbarGroup
