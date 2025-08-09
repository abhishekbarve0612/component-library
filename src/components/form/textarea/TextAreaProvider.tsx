import { useId } from "react"
import type { TextareaContextType } from "./context"
import TextareaContext from "./context"

interface TextareaProviderProps {
  children: React.ReactNode
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
}

function TextareaProvider({
  children,
  value,
  onValueChange,
  name,
  required,
  disabled,
  error,
  description,
  maxLength,
  autoResize,
  className
}: TextareaProviderProps) {
  const textareaId = useId()
  const labelId = `${textareaId}-label`
  const errorId = `${textareaId}-error`
  const descriptionId = `${textareaId}-description`
  
  const hasError = Boolean(error)

  const contextValue: TextareaContextType = {
    value,
    onValueChange,
    name,
    required,
    disabled,
    error,
    description,
    maxLength,
    autoResize,
    className,
    textareaId,
    labelId,
    errorId,
    descriptionId,
    hasError
  }

  return (
    <TextareaContext.Provider value={contextValue}>
      {children}
    </TextareaContext.Provider>
  )
}

export default TextareaProvider