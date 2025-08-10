import React from 'react'
import { cn } from '@/helpers/utils'
import { useNavbarContext } from './context'

interface NavbarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'left' | 'center' | 'right'
}

function NavbarGroup({ align = 'left', className, children, ...props }: NavbarGroupProps) {
  const { variant, breakpoint } = useNavbarContext()

  let alignmentClass = ''
  if (variant === 'horizontal') {
    if (align === 'left') alignmentClass = ''
    if (align === 'center') alignmentClass = 'mx-auto'
    if (align === 'right') alignmentClass = 'ml-auto'
  }

  return (
    <div
      className={cn(
        variant === 'horizontal'
          ? `flex flex-row items-center gap-4 px-4 py-2 ${breakpoint}:py-0 ${alignmentClass}`
          : 'flex flex-col gap-2 px-4 py-2',
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
