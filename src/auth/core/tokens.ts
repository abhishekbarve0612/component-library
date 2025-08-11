import { getCookie, setCookie, deleteCookie } from './cookies'

let accessToken: string | null = null

export function setAccessToken(token: string) {
  accessToken = token
}

export function getAccessToken() {
  return accessToken
}

export function clearTokens() {
  accessToken = null
  deleteCookie('refresh_token')
  deleteCookie('user_id')
  deleteCookie('client_id')
}

export function storeLoginData({
  accessToken: at,
  refreshToken,
  userId,
  clientId,
}: {
  accessToken: string
  refreshToken: string
  userId?: string
  clientId?: string
}) {
  accessToken = at
  setCookie('refresh_token', refreshToken, 7)
  if (userId) setCookie('user_id', userId, 7)
  if (clientId) setCookie('client_id', clientId, 7)
}

export async function refreshAccessToken(endpoint: string): Promise<boolean> {
  const refreshToken = getCookie('refresh_token')
  if (!refreshToken) return false

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    })
    if (!res.ok) return false

    const data = await res.json()
    if (data.accessToken) {
      setAccessToken(data.accessToken)
      return true
    }
    return false
  } catch {
    return false
  }
}
