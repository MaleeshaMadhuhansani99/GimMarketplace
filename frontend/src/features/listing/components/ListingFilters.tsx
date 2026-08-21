import type { Category } from '@/features/types/listing.types'
import CategorySelect from './CategorySelect'
import FilterActions from '../../../components/form/FilterActions'
import NumericInput from '../../../components/form/NumericInput'

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
    <div className="rounded-xl border border-gray-200 bg-white p-2 shadow-sm">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <CategorySelect value={category} onChange={onCategoryChange} />

        <NumericInput
          label="Min price"
          value={minPrice}
          onChange={onMinPriceChange}
          placeholder="Minimum price"
        />

        <NumericInput
          label="Max price"
          value={maxPrice}
          onChange={onMaxPriceChange}
          placeholder="Maximum price"
        />

        <FilterActions onSubmit={onApply} onClear={onClear} />
      </div>
    </div>
  )
}

export default ListingFilters