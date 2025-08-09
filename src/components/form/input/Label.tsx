import { cn } from '@/helpers/utils'
import { useInputContext } from './context'

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
  className?: string
}

function Label({ children, className, ...props }: LabelProps) {
  const { id } = useInputContext()
  return (
    <label
      htmlFor={id}
      className={cn('peer block w-full text-sm text-gray-500', className)}
      {...props}
    >
      {children}
    </label>
  )
}

Label.displayName = 'Input.Label'

export default Label
