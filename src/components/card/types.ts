import React from 'react'
import type { LinkProps } from '../link'

export interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'elevated' | 'outlined' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  hoverable?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
  onClick?: () => void
  href?: string
  LinkComponent?: React.ComponentType<LinkProps>
}

export interface CardHeaderProps {
  children: React.ReactNode
  className?: string
  divider?: boolean
}

export interface CardContentProps {
  children: React.ReactNode
  className?: string
}

export interface CardFooterProps {
  children: React.ReactNode
  className?: string
  divider?: boolean
}

export interface CardImageProps {
  src: string
  alt: string
  className?: string
  aspectRatio?: 'square' | 'video' | 'wide' | 'auto'
  objectFit?: 'cover' | 'contain' | 'fill' | 'scaleDown'
}

export interface CardTitleProps {
  children: React.ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export interface CardDescriptionProps {
  children: React.ReactNode
  className?: string
  lines?: 1 | 2 | 3 | 4 | 5 | 6
}
