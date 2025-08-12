import type { ButtonHTMLAttributes, HTMLAttributes } from 'react'

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  orientation?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
}

export interface TabListProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export interface TabTriggerProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  value: string
  children: React.ReactNode
  className?: string
}

export interface TabContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string
  children: React.ReactNode
  className?: string
  forceMount?: boolean
  loading?: boolean
}
