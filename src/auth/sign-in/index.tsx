'use client'
import { useState } from 'react'
import useAuth from '@/auth/core/useAuth'

interface SignInFormRootProps {
  endpoint: string
  children: (props: {
    values: { email: string; password: string }
    errors: Record<string, string>
    loading: boolean
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleSubmit: (e: React.FormEvent) => void
  }) => React.ReactNode
  onSuccess?: () => void
}

export function SignInFormRoot({ endpoint, children, onSuccess }: SignInFormRootProps) {
  const { login } = useAuth()

  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!values.email.includes('@')) errs.email = 'Invalid email'
    if (values.password.length < 6) errs.password = 'Password must be at least 6 characters'
    return errs
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setLoading(true)
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        setErrors({ global: errorData.message || 'Login failed' })
        setLoading(false)
        return
      }

      const { accessToken, refreshToken, userId, clientId } = await res.json()
      if (!accessToken || !refreshToken) {
        setErrors({ global: 'Invalid response from server' })
        setLoading(false)
        return
      }

      login(accessToken, refreshToken, userId, clientId)
      onSuccess?.()
    } catch {
      setErrors({ global: 'Network error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {children({ values, errors, loading, handleChange, handleSubmit })}
    </form>
  )
}
