import { useState, useEffect, useCallback } from 'react'
import { getAccessToken, storeLoginData, clearTokens } from './tokens'
import type { User } from '../types/auth.types'

interface UseAuthReturn {
  isAuthenticated: boolean
  user: User | null
  loading: boolean
  login: (accessToken: string, refreshToken: string, userId?: string, clientId?: string) => void
  loginWithUser: (user: User) => void
  logout: () => void
  getAccessToken: () => string | null
  refreshAuth: () => Promise<boolean>
}

function useAuth(): UseAuthReturn {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = getAccessToken()
    setIsAuthenticated(!!token)

    setLoading(false)
  }, [])

  const login = useCallback(
    (accessToken: string, refreshToken: string, userId?: string, clientId?: string) => {
      storeLoginData({ accessToken, refreshToken, userId, clientId })
      setIsAuthenticated(true)
      setLoading(false)
    },
    []
  )

  const loginWithUser = useCallback((userData: User) => {
    setUser(userData)
    setIsAuthenticated(true)
    setLoading(false)
  }, [])

  const logout = useCallback(() => {
    clearTokens()
    setIsAuthenticated(false)
    setUser(null)
    setLoading(false)
  }, [])

  const refreshAuth = useCallback(async (): Promise<boolean> => {
    try {
      const token = getAccessToken()
      if (token) {
        setIsAuthenticated(true)
        return true
      }
      return false
    } catch (error) {
      console.error('Failed to refresh auth:', error)
      logout()
      return false
    }
  }, [logout])

  return {
    isAuthenticated,
    user,
    loading,
    login,
    loginWithUser,
    logout,
    getAccessToken,
    refreshAuth,
  }
}

export default useAuth
