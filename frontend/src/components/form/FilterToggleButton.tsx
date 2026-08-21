// components/form/FilterToggleButton.tsx
import { FiSliders } from 'react-icons/fi'

interface FilterToggleButtonProps {
  open: boolean
  activeCount: number
  onClick: () => void
}

export default function FilterToggleButton({
  open,
  activeCount,
  onClick,
}: FilterToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition ${
        open
          ? 'border-black bg-black text-white'
          : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
      }`}
    >
      <FiSliders size={16} />
      Filters
      {activeCount > 0 && (
        <span
          className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-medium ${
            open ? 'bg-white text-black' : 'bg-black text-white'
          }`}
        >
          {activeCount}
        </span>
      )}
    </button>
  )
}