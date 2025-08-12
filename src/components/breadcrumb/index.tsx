'use client'

import { cn } from '@/helpers/utils'
import BreadcrumbContext from './context'
import BreadcrumbItem from './Item'
import BreadcrumbDivider from './Divider'
import type { BreadcrumbProps } from './types'

function Breadcrumb({ children, divider = '/', className, LinkComponent }: BreadcrumbProps) {
  const contextValue = {
    divider,
    LinkComponent,
  }

  return (
    <BreadcrumbContext.Provider value={contextValue}>
      <nav aria-label="Breadcrumb" className={cn('flex', className)} role="navigation">
        <ol className="flex items-center space-x-0">{children}</ol>
      </nav>
    </BreadcrumbContext.Provider>
  )
}

Breadcrumb.Item = BreadcrumbItem
Breadcrumb.Divider = BreadcrumbDivider

Breadcrumb.displayName = 'Breadcrumb'

export default Breadcrumb
