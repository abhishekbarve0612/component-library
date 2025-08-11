import { useState } from 'react'
import { getAccessToken, storeLoginData, clearTokens } from './tokens'

function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getAccessToken())

  const login = (accessToken: string, refreshToken: string, userId?: string, clientId?: string) => {
    storeLoginData({ accessToken, refreshToken, userId, clientId })
    setIsAuthenticated(true)
  }

  const logout = () => {
    clearTokens()
    setIsAuthenticated(false)
  }

  return {
    isAuthenticated,
    login,
    logout,
    getAccessToken,
  }
}

export default useAuth
