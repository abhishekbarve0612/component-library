import { cn } from '@/helpers/utils'
import type { CardTitleProps } from './types'

function Title({ children, className, as: Component = 'h3' }: CardTitleProps) {
  const baseClasses = 'font-semibold leading-none tracking-tight'

  const sizeClasses = {
    h1: 'text-3xl',
    h2: 'text-2xl',
    h3: 'text-lg',
    h4: 'text-base',
    h5: 'text-sm',
    h6: 'text-xs',
  }

  return (
    <Component
      className={cn(
        baseClasses,
        sizeClasses[Component],
        'text-gray-900 dark:text-gray-100',
        className
      )}
    >
      {children}
    </Component>
  )
}

Title.displayName = 'Card.Title'

export default Title
