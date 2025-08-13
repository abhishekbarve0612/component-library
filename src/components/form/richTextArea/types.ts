export interface RichTextareaProps {
  className?: string
  initialValue?: string
  placeholder?: string
  disabled?: boolean
  onChange?: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
  'aria-label'?: string
  'aria-describedby'?: string
}
