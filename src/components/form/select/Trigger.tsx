import { FaCircleChevronDown } from "react-icons/fa6"
import { cn } from "@/helpers/utils"

interface SelectTriggerProps {
  children: React.ReactNode
  className?: string
  isOpen?: boolean
  setIsOpen?: (open: boolean) => void
  onKeyDown?: (event: React.KeyboardEvent) => void
}

function SelectTrigger({
  children,
  className = '',
  isOpen,
  setIsOpen,
  onKeyDown,
}: SelectTriggerProps) {
  return (
    <button
      className={cn(
        `flex items-center justify-between w-full rounded-md border 
        border-gray-300 bg-white/70 backdrop-blur-sm px-3 py-2
        text-sm cursor-pointer transition-all outline-none`,
        {
          'border-green-500 shadow-sm': isOpen,
        },
        className
      )}
      onClick={() => setIsOpen?.(!isOpen)}
      onKeyDown={onKeyDown}
      type="button"
    >
      {children}
      <FaCircleChevronDown className="inline-block ml-auto w-4 h-4 text-gray-500 transition-transform" />
    </button>
  )
}

SelectTrigger.displayName = 'Select.Trigger'

export default SelectTrigger