import { cn } from '@/helpers/utils'

export interface IconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

function Icon({ children, className, ...props }: IconProps) {
  return (
    <button type="button" className={cn('input-icon', className)} {...props}>
      {children}
    </button>
  )
}

Icon.displayName = 'Input.Icon'

export default Icon
