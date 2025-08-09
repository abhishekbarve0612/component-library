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
      className={cn(`peer block w-full text-sm  text-gray-500 
        group-has-[input:user-invalid]:text-red-500
        group-has-[input:required]:after:content-['*']
        group-has-[input:required]:after:text-red-500
        group-has-[input:required]:after:ml-1
        `, className)}
      {...props}
    >
      {children}
    </label>
  )
}

Label.displayName = 'Input.Label'

export default Label
