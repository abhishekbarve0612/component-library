import { useActionState } from 'react'
import signUpAction from '../actions/signUpAction'
import type { SignUpActionState, User } from '../types/auth.types'
import Form from '@/components/form'

interface SignUpFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  endpoint?: string
  onSuccess?: (user: User) => void
  children: React.ReactNode
}

function SignUpForm({
  endpoint = '/api/auth/signup',
  onSuccess,
  children,
  ...props
}: SignUpFormProps) {
  const initialState: SignUpActionState = {
    success: false,
    error: null,
    user: null,
  }

  const boundSignUpAction = async (prevState: SignUpActionState, formData: FormData) => {
    return signUpAction(prevState, formData, endpoint)
  }

  const [state, dispatch] = useActionState(boundSignUpAction, initialState)

  if (state.success && state.user && onSuccess) {
    onSuccess(state.user)
  }

  return (
    <Form {...props} action={dispatch}>
      {children}
    </Form>
  )
}

export default SignUpForm
