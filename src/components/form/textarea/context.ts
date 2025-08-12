'use client'
import React from 'react'

export interface TextareaContextType {
  value: string
  onValueChange?: (value: string) => void
  name?: string
  required: boolean
  disabled: boolean
  error?: string | boolean
  description?: string
  maxLength?: number
  autoResize: boolean
  className?: string
  textareaId: string
  labelId: string
  errorId: string
  descriptionId: string
  hasError: boolean
}

const TextareaContext = React.createContext<TextareaContextType | null>(null)

export function useTextareaContext() {
  const context = React.useContext(TextareaContext)
  if (!context) {
    throw new Error('Textarea components must be used within a Textarea provider')
  }
  return context
}

export default TextareaContext
