export interface SelectProps {
  value: string
  onValueChange: (value: string) => void
  children: React.ReactNode
  className?: string
  disabled?: boolean
}

export interface SelectItemProps {
  value: string
  children: React.ReactNode
  disabled?: boolean
  className?: string
  index?: number
  optionId?: string
}

export interface SelectContentProps {
  children: React.ReactNode
  className?: string
}

export interface SelectTriggerProps {
  children: React.ReactNode
  className?: string
}
