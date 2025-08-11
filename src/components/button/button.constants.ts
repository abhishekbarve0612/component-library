import { tv } from 'tailwind-variants'

export const SIZES = {
  default: 'default',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
}

export const VARIANTS = {
  default: 'default',
  primary: 'primary',
  secondary: 'secondary',
  outline: 'outline',
  ghost: 'ghost',
  link: 'link',
  destructive: 'destructive',
}

export const buttonVariants = tv({
  base: 'inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  variants: {
    variant: {
      default:
        'bg-slate-900 text-slate-50 shadow hover:bg-slate-800 focus:ring-slate-500 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200',
      primary:
        'bg-blue-600 text-white shadow hover:bg-blue-700 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700',
      secondary:
        'bg-slate-100 text-slate-900 shadow-sm hover:bg-slate-200 focus:ring-slate-500 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-700',
      outline:
        'border border-slate-200 bg-white text-slate-900 shadow-sm hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-800 dark:hover:text-slate-50',
      ghost:
        'text-slate-900 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-500 dark:text-slate-50 dark:hover:bg-slate-800 dark:hover:text-slate-50',
      link:
        'text-slate-900 underline-offset-4 hover:underline focus:ring-slate-500 dark:text-slate-50',
      destructive:
        'bg-red-600 text-white shadow hover:bg-red-700 focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-700',
    },
    size: {
      default: 'px-3 py-2',
      sm: 'px-2 py-1 text-sm',
      md: 'px-3 py-2 text-base',
      lg: 'px-3.5 py-2.5 text-lg',
      xl: 'px-4 py-2.5 text-xl',
    },
    active: {
      true: 'ring-2 ring-slate-500 ring-offset-2 dark:ring-slate-400 dark:ring-offset-slate-900',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})
