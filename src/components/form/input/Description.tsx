'use client'

import { cn } from '@/helpers/utils'
import { useInputContext } from './context'

interface DescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
  className?: string
}

function Description({ children, className, ...props }: DescriptionProps) {
  const { id } = useInputContext()
  const descriptionId = `${id}-description`

  return (
    <p
      id={descriptionId}
      className={cn(
        'text-sm text-gray-500',
        'group-has-[input:user-invalid]:block',
        'group-has-[input:user-invalid]:text-red-500',
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
