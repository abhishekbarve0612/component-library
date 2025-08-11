import { useContext } from 'react'
import { cn } from '@/helpers/utils'
import CardContext from './context'
import type { CardHeaderProps } from './types'

function Header({ children, className, divider = false }: CardHeaderProps) {
  const { padding } = useContext(CardContext)

  const paddingClasses = {
    none: '',
    sm: 'p-3 pb-2',
    md: 'p-4 pb-3',
    lg: 'p-6 pb-4',
  }

  return (
    <div
      className={cn(
        'flex flex-col space-y-1.5',
        paddingClasses[padding],
        {
          'border-b border-gray-200 dark:border-gray-700': divider,
        },
        className
      )}
    >
      {children}
    </div>
  )
}

Header.displayName = 'Card.Header'

export default Header
