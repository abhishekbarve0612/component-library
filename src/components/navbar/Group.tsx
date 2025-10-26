import React from 'react'
import { cn } from '@/helpers/utils'
import { useNavbarContext } from './context'

interface NavbarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'left' | 'center' | 'right'
}

function NavbarGroup({ align = 'left', className, children, ...props }: NavbarGroupProps) {
  const { collapsible, isOpen } = useNavbarContext()
  const alignmentClasses = {
    left: '',
    center: 'mx-auto',
    right: 'ml-auto',
  }

  return (
    <div
      className={cn(
        'flex items-center',
        'flex flex-wrap gap-2 px-6 py-2',
        collapsible && !isOpen && 'flex-row gap-2',
        collapsible && isOpen && 'flex-col gap-2',
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
