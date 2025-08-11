import { useActionState, useEffect } from 'react'
import loginAction from '../actions/loginAction'
import { cn } from '@/helpers/utils'
import useAuth from '@/auth/core/useAuth'
import type { User, LoginActionState } from '../types/auth.types'
import type { FormProps } from '@/components/form'
import Form from '@/components/form'

interface SignInFormProps extends Omit<FormProps, 'onError' | 'children'> {
  endpoint?: string
  onSuccess?: (user: User) => void
  onError?: (error: string) => void
  children:
    | React.ReactNode
    | ((props: { isPending: boolean; error: string | null; success: boolean }) => React.ReactNode)
}

function SignInForm({
  endpoint = '/api/auth/login',
  onSuccess,
  onError,
  children,
  className,
  ...props
}: SignInFormProps) {
  const { loginWithUser } = useAuth()

  // Create a bound action using the endpoint
  const boundLoginAction = async (prevState: LoginActionState, formData: FormData) => {
    return loginAction(prevState, formData, endpoint)
  }

  const [state, formAction, isPending] = useActionState(boundLoginAction, {
    success: false,
    error: null,
    user: null,
  } as LoginActionState)

  useEffect(() => {
    if (state.success && state.user) {
      loginWithUser(state.user)
      onSuccess?.(state.user)
    } else if (state.error) {
      onError?.(state.error)
    }
  }, [state.success, state.user, state.error, onSuccess, onError, loginWithUser])

  return (
    <Form className={cn('space-y-6', className)} {...props} action={formAction}>
      {typeof children === 'function'
        ? children({
            isPending,
            error: state.error,
            success: state.success,
          })
        : children}
    </Form>
  )
}

SignInForm.displayName = 'SignIn.Form'

export default SignInForm
