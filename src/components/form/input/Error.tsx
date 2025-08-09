import { useInputContext } from './context'
import { cn } from '@/helpers/utils'

interface ErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
  className?: string
}

function Error({ children, className, ...props }: ErrorProps) {
  const { id } = useInputContext()
  const errorId = `${id}-error`

  if (!children) return null

  return (
    <p id={errorId} role="alert" className={cn('text-sm text-red-500', className)} {...props}>
      {children}
    </p>
  )
}

Error.displayName = 'Input.Error'

export default Error
