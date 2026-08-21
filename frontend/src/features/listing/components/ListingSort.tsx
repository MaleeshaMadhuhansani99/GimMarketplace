import type { SortOption } from "@/features/types/listing.types"

interface ListingSortProps {
  value: SortOption
  onChange: (value: SortOption) => void
}

const ListingSort = ({
  value,
  onChange,
}: ListingSortProps) => {
  return (
    <div className="flex items-center justify-between">
      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value as SortOption)
        }
        className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2"
      >
        <option value="newest">
          Newest
        </option>

        <option value="oldest">
          Oldest
        </option>

        <option value="price_asc">
          Price: Low to High
        </option>

        <option value="price_desc">
          Price: High to Low
        </option>
      </select>
    </div>
  )
}

export default ListingSort