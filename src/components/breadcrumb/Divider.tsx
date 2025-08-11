import React from 'react'
import { cn } from '@/helpers/utils'

interface BreadcrumbDividerProps {
  children?: React.ReactNode
  className?: string
}

const Divider: React.FC<BreadcrumbDividerProps> = ({
  children = '/',
  className
}) => {
  return (
    <span 
      className={cn(
        'mx-2 text-gray-400 dark:text-gray-500 select-none',
        className
      )}
      aria-hidden="true"
    >
      {children}
    </span>
  )
}

Divider.displayName = 'Breadcrumb.Divider'

export default Divider