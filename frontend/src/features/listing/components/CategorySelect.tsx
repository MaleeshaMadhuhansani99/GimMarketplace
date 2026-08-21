import { FiChevronDown } from 'react-icons/fi'
import type { Category } from '@/features/types/listing.types'

interface CategorySelectProps {
  value: Category | ''
  onChange: (value: Category | '') => void
}

const CATEGORIES: Category[] = [
  'Mobile Phones',
  'Laptops',
  'Furniture',
  'Kitchen items',
  'Sports',
  'Books',
  'Gaming',
  'Clothing',
  'Other',
]

export default function CategorySelect({ value, onChange }: CategorySelectProps) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">
        Category
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as Category | '')}
          className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 pr-9 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-black/10"
        >
          <option value="">All categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <FiChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>
    </div>
  )
}