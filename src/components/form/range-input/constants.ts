import { cn } from '@/helpers/utils'

export const RANGE_INPUT_CLASSES = {
  container: 'w-full space-y-2',
  wrapper: 'relative',
  input: cn(
    'w-full h-1 bg-muted appearance-none cursor-pointer',
    'focus:outline-none',
    'disabled:cursor-not-allowed disabled:opacity-50',
    // WebKit styles
    '[&::-webkit-slider-thumb]:appearance-none',
    '[&::-webkit-slider-thumb]:w-4',
    '[&::-webkit-slider-thumb]:h-4',
    '[&::-webkit-slider-thumb]:bg-primary',
    '[&::-webkit-slider-thumb]:rounded-full',
    '[&::-webkit-slider-thumb]:cursor-pointer',
    '[&::-webkit-slider-thumb]:transition-all',
    '[&::-webkit-slider-thumb]:duration-200',
    '[&::-webkit-slider-thumb]:hover:scale-110',
    '[&::-webkit-slider-thumb]:active:scale-95',
    '[&::-webkit-slider-thumb]:shadow-sm',
    '[&::-webkit-slider-track]:bg-muted',
    '[&::-webkit-slider-track]:h-1',
    '[&::-webkit-slider-track]:appearance-none',
    // Mozilla styles
    '[&::-moz-range-thumb]:w-4',
    '[&::-moz-range-thumb]:h-4',
    '[&::-moz-range-thumb]:bg-primary',
    '[&::-moz-range-thumb]:rounded-full',
    '[&::-moz-range-thumb]:cursor-pointer',
    '[&::-moz-range-thumb]:appearance-none',
    '[&::-moz-range-thumb]:border-none',
    '[&::-moz-range-thumb]:shadow-sm',
    '[&::-moz-range-track]:bg-muted',
    '[&::-moz-range-track]:h-1',
    '[&::-moz-range-track]:border-none'
  ),
  label: 'text-sm font-medium text-foreground',
  description: 'text-sm text-muted-foreground',
  error: 'text-sm text-destructive',
  valueDisplay: 'text-sm font-medium text-foreground bg-primary/10 px-2 py-1 rounded',
  minMaxLabels: 'flex justify-between text-xs text-muted-foreground mt-1',
}

export const DEFAULT_PROPS = {
  min: 0,
  max: 100,
  step: 1,
  showValue: true,
  showLabels: false,
}
