import { cn } from '@/helpers/utils'

interface SignUpErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  error?: string | null
  children?: React.ReactNode
}

function SignUpError({ error: customError, children, className, ...props }: SignUpErrorProps) {
  const error = customError

  if (!error && !children) {
    return null
  }

  return (
    <div
      className={cn(
        'text-destructive bg-destructive/10 border-destructive/20 rounded-md border p-3 text-sm',
        className
      )}
      role="alert"
      {...props}
    >
      {error || children}
    </div>
  )
}

export default SignUpError
