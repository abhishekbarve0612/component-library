import React from 'react'

export interface RangeInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  min?: number
  max?: number
  step?: number
  value?: number
  defaultValue?: number
  showValue?: boolean
  showLabels?: boolean
  label?: string
  description?: string
  error?: string
  className?: string
  thumbClassName?: string
  trackClassName?: string
  rangeClassName?: string
}

export interface RangeInputState {
  value: number
  isDragging: boolean
}