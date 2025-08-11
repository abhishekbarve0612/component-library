import { storeLoginData } from '../core/tokens'
import type { LoginActionState, LoginResponse } from '../types/auth.types'

/**
 * Generic login action that works with any API endpoint
 * @param prevState - Previous form state
 * @param formData - Form data from the form submission
 * @param endpoint - API endpoint for login (defaults to '/api/auth/login')
 */
async function loginAction(
  prevState: LoginActionState,
  formData: FormData,
  endpoint: string = '/api/auth/login'
): Promise<LoginActionState> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Reset previous state
  const initialState: LoginActionState = {
    success: false,
    error: null,
    user: null,
  }

  // Validation
  if (!email || !email.includes('@')) {
    return {
      ...initialState,
      error: 'Please enter a valid email address',
    }
  }

  if (!password || password.length < 6) {
    return {
      ...initialState,
      error: 'Password must be at least 6 characters long',
    }
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return {
        ...initialState,
        error: errorData.message || `Login failed (${response.status})`,
      }
    }

    const data: LoginResponse = await response.json()

    if (!data.accessToken || !data.refreshToken || !data.user) {
      return {
        ...initialState,
        error: 'Invalid response from server',
      }
    }
    storeLoginData({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      userId: data.user.id,
      clientId: undefined,
    })

    return {
      success: true,
      error: null,
      user: data.user,
    }
  } catch (error) {
    console.error('Login action error:', error)
    return {
      ...initialState,
      error: 'Network error occurred. Please try again.',
    }
  }
}

export default loginAction
