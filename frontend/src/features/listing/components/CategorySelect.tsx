// features/listing/components/CategorySelect.tsx
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
  'Kitchen items',
   'Sports',
   'Books',
   'Gaming',
   'Clothing',
   'Other'
]

export default function CategorySelect({ value, onChange }: CategorySelectProps) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium">Category</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as Category | '')}
        className="w-full rounded-lg border border-gray-300 px-3 py-2"
      >
        <option value="">All categories</option>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  )
}