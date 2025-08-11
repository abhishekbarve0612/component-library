import { cn } from '@/helpers/utils'
import type { LoaderProps } from './types'
import Spinner from './variants/Spinner'
import Dots from './variants/Dots'
import Bars from './variants/Bars'
import Pulse from './variants/Pulse'
import Ripple from './variants/Ripple'

const colorClasses = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  muted: 'text-muted-foreground',
  accent: 'text-accent-foreground',
}

const variants = {
  spinner: Spinner,
  dots: Dots,
  bars: Bars,
  pulse: Pulse,
  ripple: Ripple,
}

function Loader({
  loading = true,
  variant = 'spinner',
  size = 'md',
  color = 'primary',
  text,
  overlay = false,
  children,
  className,
  ...props
}: LoaderProps) {
  const VariantComponent = variants[variant]
  const colorClass = colorClasses[color]

  if (!loading) {
    return <>{children}</>
  }

  const loaderContent = (
    <div 
      className={cn('flex flex-col items-center justify-center gap-3', className)}
      {...props}
    >
      <VariantComponent size={size} color={colorClass} />
      {text && (
        <span className={cn('text-sm font-medium', colorClass)}>
          {text}
        </span>
      )}
    </div>
  )

  if (overlay) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        {loaderContent}
        {children && (
          <div className="absolute inset-0 pointer-events-none opacity-50">
            {children}
          </div>
        )}
      </div>
    )
  }

  return loaderContent
}

export default Loader
