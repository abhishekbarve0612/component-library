import { cn } from '@/helpers/utils'

export interface IconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  position?: 'left' | 'right'
}

function Icon({ children, position = 'left', className, ...props }: IconProps) {
  const positionClass = position === 'left' ? 'pointer-events-none' : 'cursor-pointer'
  return (
    <button type="button" className={cn('input-icon', positionClass, className)} {...props}>
      {children}
    </button>
  )
}

Icon.displayName = 'Input.Icon'

export default Icon
