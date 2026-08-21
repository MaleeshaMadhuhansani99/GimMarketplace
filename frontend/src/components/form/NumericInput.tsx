interface NumericInputProps {
  label: string
  value: number | ''
  onChange: (value: number | '') => void
  placeholder?: string
  min?: number
  max?: number
}

export default function NumericInput({
  label,
  value,
  onChange,
  placeholder,
  min = 0,
  max,
}: NumericInputProps) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 px-3 py-2"
      />
    </div>
  )
}