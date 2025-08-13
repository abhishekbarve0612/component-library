import { cn } from '@/helpers/utils'
import type { LabelProps } from './types'

function Label({ children, className, ...props }: LabelProps) {
  return (
    <label className={cn('text-foreground block text-sm font-medium', className)} {...props}>
      {children}
    </label>
  )
}

export default Label
