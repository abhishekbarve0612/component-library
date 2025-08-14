import type { HTMLAttributes } from 'react'

export interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  scrollbarClassName?: string
  thumbClassName?: string
  viewportClassName?: string
  orientation?: 'horizontal' | 'vertical' | 'both'
  hideScrollbar?: boolean
  scrollHideDelay?: number
  type?: 'auto' | 'always' | 'scroll' | 'hover'
  height?: string | number
  maxHeight?: string | number
}
