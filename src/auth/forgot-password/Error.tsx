import { cn } from '@/helpers/utils'
import { FaExclamationTriangle } from 'react-icons/fa'

interface ForgotPasswordErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  error?: string | null
  children?: React.ReactNode
}

function ForgotPasswordError({ error, children, className, ...props }: ForgotPasswordErrorProps) {
  const errorMessage = error || children

  if (!errorMessage) return null

  return (
    <div
      className={cn(
        'bg-destructive/10 text-destructive rounded-md p-3 text-sm',
        'flex items-center gap-2',
        className
      )}
      role="alert"
      {...props}
    >
      <FaExclamationTriangle className="h-4 w-4 flex-shrink-0" />
      <span>{errorMessage}</span>
    </div>
  )
}

ForgotPasswordError.displayName = 'ForgotPassword.Error'

export default ForgotPasswordError
