interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  value: string
  error?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function Field({ name, label, value, error, onChange, ...props }: FieldProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={name} className="text-sm font-medium">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        {...props}
        className="rounded border px-2 py-1 text-sm"
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}

export default Field
