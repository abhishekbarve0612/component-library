'use client'

import React from 'react'
import type { BadgeSize, BadgeVariant } from './badge.types'
import { SIZES, VARIANTS, badgeVariants } from './badge.constants'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
  variant?: BadgeVariant
  size?: BadgeSize
  className?: string
}

function Badge({
  children,
  className = '',
  variant = 'default',
  size = 'default',
  ...props
}: BadgeProps) {
  return (
    <span className={badgeVariants({ variant, size, className })} {...props}>
      {children}
    </span>
  )
}

Badge.variants = VARIANTS
Badge.sizes = SIZES

export default Badge