import React from 'react'
import type { LinkProps } from '@components/link'

export interface BreadcrumbProps {
  children: React.ReactNode
  divider?: React.ReactNode
  className?: string
  LinkComponent?: React.ComponentType<Partial<LinkProps>>
}

export interface BreadcrumbItemProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  disabled?: boolean
  className?: string
  isCurrentPage?: boolean
  LinkComponent?: React.ComponentType<Partial<LinkProps>>
}
