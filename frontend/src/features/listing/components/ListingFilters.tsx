import type { Category } from '@/features/types/types'

interface ListingFiltersProps {
  category: Category | ''
  minPrice: number | ''
  maxPrice: number | ''
  onCategoryChange: (value: Category | '') => void
  onMinPriceChange: (value: number | '') => void
  onMaxPriceChange: (value: number | '') => void
  onApply: () => void
  onClear: () => void
}

const ListingFilters = ({
  category,
  minPrice,
  maxPrice,
  onCategoryChange,
  onMinPriceChange,
  onMaxPriceChange,
  onApply,
  onClear,
}: ListingFiltersProps) => {
  return (
    <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Category */}
        <div>
          <label className="mb-1 block text-sm font-medium">
            Category
          </label>

          <select
            value={category}
            onChange={(e) =>
              onCategoryChange(
                e.target.value as Category | '',
              )
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          >
            <option value="">All categories</option>
            <option value="Mobile phones">
              Mobile phones
            </option>
            <option value="Laptops">
              Laptops
            </option>
            <option value="Furniture">
              Furniture
            </option>
            <option value="Kitchen items">
              Kitchen items
            </option>
          </select>
        </div>

        {/* Minimum price */}
        <div>
          <label className="mb-1 block text-sm font-medium">
            Min price
          </label>

          <input
            type="number"
            min="0"
            value={minPrice}
            onChange={(e) =>
              onMinPriceChange(
                e.target.value === ''
                  ? ''
                  : Number(e.target.value),
              )
            }
            placeholder="Minimum price"
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>

        {/* Maximum price */}
        <div>
          <label className="mb-1 block text-sm font-medium">
            Max price
          </label>

          <input
            type="number"
            min="0"
            value={maxPrice}
            onChange={(e) =>
              onMaxPriceChange(
                e.target.value === ''
                  ? ''
                  : Number(e.target.value),
              )
            }
            placeholder="Maximum price"
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>

        {/* Actions */}
        <div className="flex items-end gap-2">
          <button
            type="button"
            onClick={onApply}
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
      </div>
    </div>
  )
}

export default ListingFilters