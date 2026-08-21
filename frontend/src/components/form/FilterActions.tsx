import { FiCheck, FiX } from 'react-icons/fi'

interface FilterActionsProps {
  onSubmit: () => void
  onClear: () => void
}

export default function FilterActions({ onSubmit, onClear }: FilterActionsProps) {
  return (
    <div className="flex items-end gap-0.5">
      <button
        type="button"
        onClick={onSubmit}
        className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-black px-2 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
      >
        <FiCheck size={16} />
        Apply
      </button>
      <button
        type="button"
        onClick={onClear}
        className="flex items-center justify-center gap-1.5 rounded-lg border border-gray-300 px-2 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
      >
        <FiX size={16} />
        Clear
      </button>
    </div>
  )
}