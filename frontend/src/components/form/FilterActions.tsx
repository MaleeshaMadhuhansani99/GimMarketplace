interface FilterActionsProps {
  onSubmit: () => void
  onClear: () => void
}

export default function FilterActions({ onSubmit, onClear }: FilterActionsProps) {
  return (
    <div className="flex items-end gap-2">
      <button
        type="button"
        onClick={onSubmit}
        className="rounded-lg bg-black px-4 py-2 text-white"
      >
        Apply
      </button>
      <button
        type="button"
        onClick={onClear}
        className="rounded-lg border border-gray-300 px-4 py-2"
      >
        Clear
      </button>
    </div>
  )
}