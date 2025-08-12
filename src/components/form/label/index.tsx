import { cn } from '@/helpers/utils'

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
  className?: string
}

function Label({ children, className, ...props }: LabelProps) {
  return (
    <label
      className={cn('block text-sm font-medium text-foreground', className)}
      {...props}
    >
      {children}
    </label>
  )
}

export default Label
