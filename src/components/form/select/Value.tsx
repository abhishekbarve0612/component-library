import { cn } from "@/helpers/utils"

interface SelectValueProps {
  placeholder?: string
  value?: string
  className?: string
}

function SelectValue({ placeholder, value, className }: SelectValueProps) {
  return <span className={cn('text-sm text-gray-500', className)}>{value || placeholder}</span>
}

SelectValue.displayName = 'Select.Value'

export default SelectValue