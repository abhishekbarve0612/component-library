import { useActionState, useEffect } from 'react'
import forgotPasswordAction from '../actions/forgotPasswordAction'
import { cn } from '@/helpers/utils'
import type { FormProps } from '@/components/form'
import type { ForgotPasswordActionState } from '../types/auth.types'
import Form from '@/components/form'

interface ForgotPasswordFormProps extends Omit<FormProps, 'onError' | 'children'> {
  endpoint?: string
  onSuccess?: (message: string) => void
  onError?: (error: string) => void
  children:
    | React.ReactNode
    | ((props: { isPending: boolean; error: string | null; success: boolean; message: string | null }) => React.ReactNode)
}


function ForgotPasswordForm({
  endpoint = '/api/auth/forgot-password',
  onSuccess,
  onError,
  children,
  className,
  ...props
}: ForgotPasswordFormProps) {
  // Create a bound action using the endpoint
  const boundForgotPasswordAction = async (prevState: ForgotPasswordActionState, formData: FormData) => {
    return forgotPasswordAction(prevState, formData, endpoint)
  }

  const [state, formAction, isPending] = useActionState(boundForgotPasswordAction, {
    success: false,
    error: null,
    message: null,
  } as ForgotPasswordActionState)

  useEffect(() => {
    if (state.success && state.message) {
      onSuccess?.(state.message)
    } else if (state.error) {
      onError?.(state.error)
    }
  }, [state.success, state.message, state.error, onSuccess, onError])

  return (
    <Form className={cn('space-y-6', className)} {...props} action={formAction}>
      {typeof children === 'function'
        ? children({
            isPending,
            error: state.error,
            success: state.success,
            message: state.message,
          })
        : children}
    </Form>
  )
}

ForgotPasswordForm.displayName = 'ForgotPassword.Form'

export default ForgotPasswordForm