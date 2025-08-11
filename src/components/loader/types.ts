export type LoaderVariant = 'spinner' | 'dots' | 'bars' | 'pulse' | 'ripple'
export type LoaderSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  loading?: boolean
  variant?: LoaderVariant
  size?: LoaderSize
  color?: 'primary' | 'secondary' | 'muted' | 'accent'
  text?: string
  overlay?: boolean
  children?: React.ReactNode
}