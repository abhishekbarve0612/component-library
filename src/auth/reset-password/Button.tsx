import Button from '@/components/button'
import type { ButtonProps } from '@/components/button'
import Loader from '@/components/loader'

interface ResetPasswordButtonProps extends Omit<ButtonProps, 'type'> {
  loading?: boolean
  loadingText?: string
}

function ResetPasswordButton({
  loading = false,
  loadingText = 'Resetting...',
  variant = 'primary',
  size = 'default',
  className = 'w-full',
  children = 'Reset Password',
  disabled,
  ...props
}: ResetPasswordButtonProps) {
  return (
    <Button
      type="submit"
      variant={variant}
      size={size}
      className={className}
      disabled={loading || disabled}
      {...props}
    >
      <Loader variant="spinner" size="sm" color="primary" loading={loading} text={loadingText}>
        {children}
      </Loader>
    </Button>
  )
}

ResetPasswordButton.displayName = 'ResetPassword.Button'

export default ResetPasswordButton