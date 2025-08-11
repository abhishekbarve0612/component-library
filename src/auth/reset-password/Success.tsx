import { cn } from '@/helpers/utils'
import { FaCheckCircle } from 'react-icons/fa'

interface ResetPasswordSuccessProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string | null
  children?: React.ReactNode
}

function ResetPasswordSuccess({
  message,
  children,
  className,
  ...props
}: ResetPasswordSuccessProps) {
  const successMessage = message || children

  if (!successMessage) return null

  return (
    <div
      className={cn(
        'bg-success/10 text-success rounded-md p-3 text-sm',
        'flex items-center gap-2',
        className
      )}
      role="status"
      {...props}
    >
      <FaCheckCircle className="h-4 w-4 flex-shrink-0" />
      <span>{successMessage}</span>
    </div>
  )
}

ResetPasswordSuccess.displayName = 'ResetPassword.Success'

export default ResetPasswordSuccess
