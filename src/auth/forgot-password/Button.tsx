import Button from '@/components/button'
import type { ButtonProps } from '@/components/button'
import Loader from '@/components/loader'

interface ForgotPasswordButtonProps extends Omit<ButtonProps, 'type'> {
  loading?: boolean
  loadingText?: string
}

function ForgotPasswordButton({
  loading = false,
  loadingText = 'Sending...',
  variant = 'primary',
  size = 'default',
  className = 'w-full',
  children = 'Send Reset Instructions',
  disabled,
  ...props
}: ForgotPasswordButtonProps) {
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

ForgotPasswordButton.displayName = 'ForgotPassword.Button'

export default ForgotPasswordButton
