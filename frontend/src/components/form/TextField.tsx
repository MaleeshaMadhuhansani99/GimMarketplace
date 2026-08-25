interface TextFieldProps {
  id: string
  label: string
  type?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
}

export default function TextField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
}: TextFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-lg border px-4 py-2 text-sm outline-none transition focus:ring-2 focus:ring-black/10 ${
          error ? 'border-red-400' : 'border-gray-300 focus:border-gray-400'
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}