import Button from '@/components/button/index'
import type { ButtonProps } from '@/components/button'
import Loader from '@/components/loader'

interface SignUpButtonProps extends Omit<ButtonProps, 'type'> {
  loadingText?: string
  loading?: boolean
}

function SignUpButton({
  children = 'Create Account',
  loading = false,
  loadingText = 'Creating Account...',
  disabled,
  ...props
}: SignUpButtonProps) {
  return (
    <Button type="submit" variant="default" size="default" disabled={disabled} {...props}>
      <Loader variant="bars" size="sm" color="primary" loading={loading} text={loadingText}>
        {children}
      </Loader>
    </Button>
  )
}

export default SignUpButton
