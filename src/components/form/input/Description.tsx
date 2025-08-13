'use client'

import { cn } from '@/helpers/utils'
import { useInputContext } from './context'
import type { InputDescriptionProps } from './types'

function Description({ children, className, ...props }: InputDescriptionProps) {
  const { id } = useInputContext()
  const descriptionId = `${id}-description`

  return (
    <p
      id={descriptionId}
      className={cn(
        'text-muted-foreground text-sm',
        'group-has-[input:user-invalid]:block',
        'group-has-[input:user-invalid]:text-destructive',
        'group-has-[input:user-valid]:hidden',
        'group-has-[input:empty]:hidden',
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}

Description.displayName = 'Input.Description'

export default Description
