import { cn } from '@/helpers/utils'
import type { CardDescriptionProps } from './types'

function Description({ children, className, lines }: CardDescriptionProps) {
  const lineClampClasses = lines
    ? {
        1: 'line-clamp-1',
        2: 'line-clamp-2',
        3: 'line-clamp-3',
        4: 'line-clamp-4',
        5: 'line-clamp-5',
        6: 'line-clamp-6',
      }[lines]
    : ''

  return (
    <p className={cn('text-sm text-gray-600 dark:text-gray-400', lineClampClasses, className)}>
      {children}
    </p>
  )
}

Description.displayName = 'Card.Description'

export default Description
