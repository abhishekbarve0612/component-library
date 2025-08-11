export interface User {
  id: string
  email: string
  username?: string
  firstName?: string
  lastName?: string
  name?: string
  roles?: string[]
  avatar?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  user: User
  expiresIn?: number
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

export interface LoginActionState {
  success: boolean
  error: string | null
  user: User | null
}

export interface TokenStorage {
  accessToken: string
  refreshToken: string
  userId?: string
  clientId?: string
}

export interface RefreshTokenResponse {
  accessToken: string
  expiresIn?: number
}

export interface SignUpRequest {
  email: string
  password: string
  username: string
  firstName: string
  lastName: string
}

export interface SignUpResponse {
  accessToken: string
  refreshToken: string
  user: User
  expiresIn?: number
}

export interface SignUpActionState {
  success: boolean
  error: string | null
  user: User | null
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ForgotPasswordResponse {
  message: string
  success: boolean
}

export interface ForgotPasswordActionState {
  success: boolean
  error: string | null
  message: string | null
}
