import React from 'react'

export interface BreadcrumbProps {
  children: React.ReactNode
  divider?: React.ReactNode
  className?: string
  LinkComponent?: React.ComponentType<Partial<LinkComponentProps>>
}

export interface BreadcrumbItemProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  disabled?: boolean
  className?: string
  isCurrentPage?: boolean
  LinkComponent?: React.ComponentType<Partial<LinkComponentProps>>
}

export interface LinkComponentProps {
  to?: string
  href?: string
  children?: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
  ariaCurrent?: string
  isCurrentPage?: boolean
  asChild?: boolean
  tabIndex?: number
  onMouseEnter?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  onMouseLeave?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  onFocus?: (event: React.FocusEvent<HTMLAnchorElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLAnchorElement>) => void
}
