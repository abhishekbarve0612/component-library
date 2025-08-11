import { storeLoginData } from '../core/tokens'
import type { SignUpActionState, SignUpResponse } from '../types/auth.types'

/**
 * Generic sign-up action that works with any API endpoint
 * @param prevState - Previous form state
 * @param formData - Form data from the form submission
 * @param endpoint - API endpoint for sign-up (defaults to '/api/auth/signup')
 */
async function signUpAction(
  _prevState: SignUpActionState,
  formData: FormData,
  endpoint: string = '/api/auth/signup'
): Promise<SignUpActionState> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string
  const username = formData.get('username') as string
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string

  const initialState: SignUpActionState = {
    success: false,
    error: null,
    user: null,
  }

  if (!email || !email.includes('@')) {
    return {
      ...initialState,
      error: 'Please enter a valid email address',
    }
  }

  if (!username || username.length < 3) {
    return {
      ...initialState,
      error: 'Username must be at least 3 characters long',
    }
  }

  if (!password || password.length < 6) {
    return {
      ...initialState,
      error: 'Password must be at least 6 characters long',
    }
  }

  if (password !== confirmPassword) {
    return {
      ...initialState,
      error: 'Passwords do not match',
    }
  }

  if (!firstName || firstName.trim().length === 0) {
    return {
      ...initialState,
      error: 'First name is required',
    }
  }

  if (!lastName || lastName.trim().length === 0) {
    return {
      ...initialState,
      error: 'Last name is required',
    }
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        username,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return {
        ...initialState,
        error: errorData.message || `Sign up failed (${response.status})`,
      }
    }

    const data: SignUpResponse = await response.json()

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
    console.error('Sign up action error:', error)
    return {
      ...initialState,
      error: 'Network error occurred. Please try again.',
    }
  }
}

export default signUpAction
