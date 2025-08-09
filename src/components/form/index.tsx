import { cn } from '@/helpers/utils'
import Input from './input'
import Label from './label'
import Select from './select'
import Textarea from './textarea'
import Checkbox from './checkbox'

export { default as Input } from './input'
export { default as Label } from './label'
export { default as Select } from './select'
export { default as Textarea } from './textarea'
export { default as Checkbox } from './checkbox'

interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
  label: string
  description?: string
  children: React.ReactNode
  className?: string
  errors?: {
    message: string
  }[]
}

function Form({ children, label, description, errors, ...props }: FormProps) {
  return (
    <form
      aria-label={label}
      aria-describedby="form-description"
      className={cn('space-y-4', props.className)}
      {...props}
    >
      {description && (
        <div id="form-description" className="sr-only">
          {description}
        </div>
      )}
      {children}
      {errors && (
        <div role="alert" className="space-y-1 text-sm text-red-600">
          {errors.map((error) => (
            <p key={error.message}>{error.message}</p>
          ))}
        </div>
      )}
    </form>
  )
}

Form.Input = Input
Form.Label = Label
Form.Select = Select
Form.Textarea = Textarea
Form.Checkbox = Checkbox

export default Form
