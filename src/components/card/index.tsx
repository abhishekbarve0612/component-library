import { cn } from '@/helpers/utils'
import CardContext from './context'
import CardHeader from './Header'
import CardContent from './Content'
import CardFooter from './Footer'
import CardImage from './Image'
import CardTitle from './Title'
import CardDescription from './Description'
import type { CardProps } from './types'

function Card({
  children,
  className,
  variant = 'default',
  size = 'md',
  hoverable = false,
  padding = 'md',
  onClick,
  href,
  LinkComponent,
}: CardProps) {
  const contextValue = {
    variant,
    size,
    padding,
  }

  const variantClasses = {
    default: 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700',
    elevated: 'bg-white dark:bg-gray-900 shadow-lg border border-gray-100 dark:border-gray-800',
    outlined: 'bg-transparent border-2 border-gray-300 dark:border-gray-600',
    ghost: 'bg-gray-50 dark:bg-gray-800/50 border-none',
  }

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }

  const baseClasses = cn(
    'rounded-lg transition-colors duration-200 flex flex-col',
    variantClasses[variant],
    sizeClasses[size],
    {
      'hover:shadow-md transition-shadow cursor-pointer': hoverable || onClick || href,
      'hover:bg-gray-50 dark:hover:bg-gray-800': hoverable && variant === 'default',
      'hover:shadow-xl': hoverable && variant === 'elevated',
      'hover:border-gray-400 dark:hover:border-gray-500': hoverable && variant === 'outlined',
      'hover:bg-gray-100 dark:hover:bg-gray-700': hoverable && variant === 'ghost',
    },
    className
  )

  const handleClick = () => {
    onClick?.()
  }

  if (href) {
    if (LinkComponent) {
      return (
        <CardContext.Provider value={contextValue}>
          <LinkComponent href={href} className={baseClasses} onClick={onClick}>
            {children}
          </LinkComponent>
        </CardContext.Provider>
      )
    }

    return (
      <CardContext.Provider value={contextValue}>
        <a href={href} className={baseClasses} onClick={onClick}>
          {children}
        </a>
      </CardContext.Provider>
    )
  }

  if (onClick) {
    return (
      <CardContext.Provider value={contextValue}>
        <button type="button" onClick={handleClick} className={cn(baseClasses, 'text-left')}>
          {children}
        </button>
      </CardContext.Provider>
    )
  }

  return (
    <CardContext.Provider value={contextValue}>
      <div className={baseClasses}>{children}</div>
    </CardContext.Provider>
  )
}

Card.VARIANT = {
  default: 'default',
  elevated: 'elevated',
  outlined: 'outlined',
  ghost: 'ghost',
}

Card.SIZE = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
}

Card.PADDING = {
  none: 'none',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
}

Card.Header = CardHeader
Card.Content = CardContent
Card.Footer = CardFooter
Card.Image = CardImage
Card.Title = CardTitle
Card.Description = CardDescription

Card.displayName = 'Card'

export default Card
