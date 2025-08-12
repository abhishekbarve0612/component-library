'use client'

import { useContext } from 'react'
import { cn } from '@/helpers/utils'
import CardContext from './context'
import type { CardFooterProps } from './types'

function Footer({ children, className, divider = false }: CardFooterProps) {
  const { padding } = useContext(CardContext)

  const paddingClasses = {
    none: '',
    sm: 'p-3 pt-2',
    md: 'p-4 pt-3',
    lg: 'p-6 pt-4',
  }

  return (
    <div
      className={cn(
        'flex items-center',
        paddingClasses[padding],
        {
          'border-t border-gray-200 dark:border-gray-700': divider,
        },
        className
      )}
    >
      {children}
    </div>
  )
}

Footer.displayName = 'Card.Footer'

export default Footer
