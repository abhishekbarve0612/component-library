import type { ResetPasswordActionState, ResetPasswordResponse } from '../types/auth.types'

/**
 * Generic reset password action that works with any API endpoint
 * @param prevState - Previous form state
 * @param formData - Form data from the form submission
 * @param endpoint - API endpoint for reset password (defaults to '/api/auth/reset-password')
 */
async function resetPasswordAction(
  prevState: ResetPasswordActionState,
  formData: FormData,
  endpoint: string = '/api/auth/reset-password'
): Promise<ResetPasswordActionState> {
  const token = formData.get('token') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  const initialState: ResetPasswordActionState = {
    success: false,
    error: null,
    message: null,
  }

  if (!token) {
    return {
      ...initialState,
      error: 'Invalid or missing reset token',
    }
  }

  if (!password || password.length < 8) {
    return {
      ...initialState,
      error: 'Password must be at least 8 characters long',
    }
  }

  if (!confirmPassword) {
    return {
      ...initialState,
      error: 'Please confirm your password',
    }
  }

  if (password !== confirmPassword) {
    return {
      ...initialState,
      error: 'Passwords do not match',
    }
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, password, confirmPassword }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return {
        ...initialState,
        error: errorData.message || `Request failed (${response.status})`,
      }
    }

    const data: ResetPasswordResponse = await response.json()

    if (!data.success) {
      return {
        ...initialState,
        error: data.message || 'Password reset failed',
      }
    }

    return {
      success: true,
      error: null,
      message: data.message || 'Your password has been successfully reset.',
    }
  } catch (error) {
    console.error('Reset password action error:', error)
    return {
      ...initialState,
      error: 'Network error occurred. Please try again.',
    }
  }
}

export default resetPasswordAction
