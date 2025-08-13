'use client'

import { useInputContext } from './context'
import { cn } from '@/helpers/utils'
import type { InputErrorProps } from './types'

function Error({ children, className, ...props }: InputErrorProps) {
  const { id } = useInputContext()
  const errorId = `${id}-error`

  if (!children) return null

  return (
    <p id={errorId} role="alert" className={cn('text-destructive text-sm', className)} {...props}>
      {children}
    </p>
  )
}

Error.displayName = 'Input.Error'

export default Error
