import type { User } from '../types/auth.types'

export const mockAction = (label: string) => (message: string) => {
  console.log(`${label}:`, message)
}
export const userMockAction = (label: string) => (user: User) => {
  console.log(`${label}:`, user)
}
