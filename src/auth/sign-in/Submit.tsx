import Button from '@/components/button'
import type { ButtonProps } from '@/components/button'
import Loader from '@/components/loader'

interface SubmitButtonProps extends Omit<ButtonProps, 'type'> {
  loading: boolean
  children: React.ReactNode
}

function SubmitButton({
  loading,
  children,
  variant = 'primary',
  size = 'default',
  className,
  ...props
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={loading}
      variant={variant}
      size={size}
      className={className}
      {...props}
    >
      <Loader variant="bars" size="sm" color="primary" loading={loading} text="Signing in...">
        {children}
      </Loader>
    </Button>
  )
}

export default SubmitButton
