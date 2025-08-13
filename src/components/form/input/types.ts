export interface InputLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
  className?: string
}

export interface InputProps {
  id?: string
  className?: string
  children?: React.ReactNode
}

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  type?: React.HTMLInputTypeAttribute
  name: string
}

export interface InputErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
  className?: string
}

export interface InputDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
  className?: string
}

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}
