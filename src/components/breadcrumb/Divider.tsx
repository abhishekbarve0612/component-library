import React from 'react'
import { cn } from '@/helpers/utils'
import type { BreadcrumbDividerProps } from './types'
const Divider: React.FC<BreadcrumbDividerProps> = ({ children = '/', className }) => {
  return (
    <span
      className={cn('mx-2 text-gray-400 select-none dark:text-gray-500', className)}
      aria-hidden="true"
    >
      {children}
    </span>
  )
}

Divider.displayName = 'Breadcrumb.Divider'

export default Divider
