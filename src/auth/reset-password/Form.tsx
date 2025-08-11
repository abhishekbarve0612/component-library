import { useActionState, useEffect } from 'react'
import resetPasswordAction from '../actions/resetPasswordAction'
import { cn } from '@/helpers/utils'
import type { FormProps } from '@/components/form'
import type { ResetPasswordActionState } from '../types/auth.types'
import Form from '@/components/form'

interface ResetPasswordFormProps extends Omit<FormProps, 'onError' | 'children'> {
  endpoint?: string
  token?: string
  onSuccess?: (message: string) => void
  onError?: (error: string) => void
  children:
    | React.ReactNode
    | ((props: {
        isPending: boolean
        error: string | null
        success: boolean
        message: string | null
      }) => React.ReactNode)
}

function ResetPasswordForm({
  endpoint = '/api/auth/reset-password',
  token,
  onSuccess,
  onError,
  children,
  className,
  ...props
}: ResetPasswordFormProps) {
  const boundResetPasswordAction = async (
    prevState: ResetPasswordActionState,
    formData: FormData
  ) => {
    return resetPasswordAction(prevState, formData, endpoint)
  }

  const [state, formAction, isPending] = useActionState(boundResetPasswordAction, {
    success: false,
    error: null,
    message: null,
  } as ResetPasswordActionState)

  useEffect(() => {
    if (state.success && state.message) {
      onSuccess?.(state.message)
    } else if (state.error) {
      onError?.(state.error)
    }
  }, [state.success, state.message, state.error, onSuccess, onError])

  return (
    <Form className={cn('space-y-6', className)} {...props} action={formAction}>
      {token && <input type="hidden" name="token" value={token} />}
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

ResetPasswordForm.displayName = 'ResetPassword.Form'

export default ResetPasswordForm
