import { cn } from '@/helpers/utils'
import { useSelectContext } from './context'

interface SelectValueProps {
  placeholder?: string
  className?: string
}

function SelectValue({ placeholder, className }: SelectValueProps) {
  const { value } = useSelectContext()
  return (
    <span className={cn('text-sm capitalize', value ? 'text-gray-900' : 'text-gray-500', className)}>
      {value || placeholder}
    </span>
  )
}

SelectValue.displayName = 'Select.Value'

export default SelectValue