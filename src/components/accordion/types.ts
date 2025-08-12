import React from 'react'

export interface AccordionProps {
  children: React.ReactNode
  className?: string
  multiple?: boolean
  collapsible?: boolean
  defaultValue?: string | string[]
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
}

export interface AccordionItemProps {
  children: React.ReactNode
  className?: string
  value: string
  disabled?: boolean
}

export interface AccordionTriggerProps {
  children: React.ReactNode
  className?: string
  disabled?: boolean
}

export interface AccordionContentProps {
  children: React.ReactNode
  className?: string
}