import { cn } from "@/helpers/utils"

export interface SelectItemProps {
  value: string
  children: React.ReactNode
  setIsOpen?: (open: boolean) => void
  onValueChange?: (value: string) => void
  onKeyDown?: (event: React.KeyboardEvent) => void
  selectedValue?: string
}

function SelectItem({ value, children, setIsOpen, onValueChange, onKeyDown, selectedValue }: SelectItemProps) {
  const handleClick = () => {
    onValueChange?.(value)
    setIsOpen?.(false)
  }

  const isSelected = selectedValue === value

  return (
    <button
      className={cn(
        'px-3 py-2 text-sm cursor-pointer transition-all outline-none',
        {
          'bg-green-500 text-white': isSelected,
        },
      )}
      onClick={handleClick}
      onKeyDown={onKeyDown}
      type="button"
    >
      {children}
    </button>
  )
}

SelectItem.displayName = 'Select.Item'

export default SelectItem