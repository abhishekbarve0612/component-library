import type { ForgotPasswordActionState, ForgotPasswordResponse } from '../types/auth.types'

/**
 * Generic forgot password action that works with any API endpoint
 * @param prevState - Previous form state
 * @param formData - Form data from the form submission
 * @param endpoint - API endpoint for forgot password (defaults to '/api/auth/forgot-password')
 */
async function forgotPasswordAction(
  prevState: ForgotPasswordActionState,
  formData: FormData,
  endpoint: string = '/api/auth/forgot-password'
): Promise<ForgotPasswordActionState> {
  const email = formData.get('email') as string

  const initialState: ForgotPasswordActionState = {
    success: false,
    error: null,
    message: null,
  }

  if (!email || !email.includes('@')) {
    return {
      ...initialState,
      error: 'Please enter a valid email address',
    }
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return {
        ...initialState,
        error: errorData.message || `Request failed (${response.status})`,
      }
    }

    const data: ForgotPasswordResponse = await response.json()

    if (!data.success) {
      return {
        ...initialState,
        error: data.message || 'Request failed',
      }
    }

    return {
      success: true,
      error: null,
      message: data.message || 'Password reset instructions have been sent to your email.',
    }
  } catch (error) {
    console.error('Forgot password action error:', error)
    return {
      ...initialState,
      error: 'Network error occurred. Please try again.',
    }
  }
}

export default forgotPasswordAction
