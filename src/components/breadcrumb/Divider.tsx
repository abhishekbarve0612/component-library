import React from 'react'
import { cn } from '@/helpers/utils'

interface BreadcrumbDividerProps {
  children?: React.ReactNode
  className?: string
}

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

export default Divider
