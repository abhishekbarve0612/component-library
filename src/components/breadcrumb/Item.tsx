'use client'

import { useContext } from 'react'
import { cn } from '@/helpers/utils'
import BreadcrumbContext from './context'
import type { BreadcrumbItemProps } from './types'

function Item({
  children,
  href,
  onClick,
  disabled = false,
  className,
  isCurrentPage = false,
}: BreadcrumbItemProps) {
  const { divider, LinkComponent: ContextLinkComponent } = useContext(BreadcrumbContext)
  const FinalLinkComponent = ContextLinkComponent

  const handleClick = (e: React.MouseEvent) => {
    if (disabled || isCurrentPage) {
      e.preventDefault()
      return
    }
    onClick?.()
  }

  const itemClasses = cn('flex items-center text-sm', className)

  const contentClasses = cn({
    'text-muted-foreground': !isCurrentPage && !href && !onClick,
    'text-foreground/80 hover:hover:text-foreground transition-colors cursor-pointer hover:hover:underline focus:outline-none focus:underline':
      (href || onClick) && !disabled && !isCurrentPage,
    'text-foreground font-medium': isCurrentPage,
    'cursor-default': disabled || isCurrentPage,
    'opacity-50': disabled,
  })

  let content: React.ReactNode

  if (isCurrentPage || disabled) {
    content = (
      <span aria-current={isCurrentPage ? 'page' : undefined} className={contentClasses}>
        {children}
      </span>
    )
  } else if (href && FinalLinkComponent) {
    content = (
      <FinalLinkComponent href={href} onClick={onClick} className={contentClasses}>
        {children}
      </FinalLinkComponent>
    )
  } else if (href && !FinalLinkComponent) {
    content = (
      <a href={href} onClick={onClick} className={contentClasses}>
        {children}
      </a>
    )
  } else if (onClick) {
    content = (
      <button type="button" onClick={handleClick} disabled={disabled} className={contentClasses}>
        {children}
      </button>
    )
  } else {
    content = <span className={contentClasses}>{children}</span>
  }

  return (
    <li className={itemClasses}>
      {content}
      {!isCurrentPage && (
        <span className="mx-2 text-muted-foreground select-none" aria-hidden="true">
          {divider}
        </span>
      )}
    </li>
  )
}

Item.displayName = 'Breadcrumb.Item'

export default Item
