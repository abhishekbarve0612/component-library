'use client'

import { useContext } from 'react'
import { cn } from '@/helpers/utils'
import CardContext from './context'
import type { CardContentProps } from './types'

function Content({ children, className }: CardContentProps) {
  const { padding } = useContext(CardContext)

  const paddingClasses = {
    none: '',
    sm: 'p-3 pt-0',
    md: 'p-4 pt-0',
    lg: 'p-6 pt-0',
  }

  return <div className={cn('flex-1', paddingClasses[padding], className)}>{children}</div>
}

Content.displayName = 'Card.Content'

export default Content
