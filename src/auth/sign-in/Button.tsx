import Button from '@/components/button'
import type { ButtonProps } from '@/components/button'
import Loader from '@/components/loader'

interface SignInButtonProps extends Omit<ButtonProps, 'type'> {
  loading?: boolean
  loadingText?: string
}

function SignInButton({
  loading = false,
  loadingText = 'Signing in...',
  variant = 'primary',
  size = 'default',
  className = 'w-full',
  children = 'Sign In',
  disabled,
  ...props
}: SignInButtonProps) {
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

SignInButton.displayName = 'SignIn.Button'

export default SignInButton
