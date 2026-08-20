import { FiSearch } from 'react-icons/fi'

interface ListingSearchProps {
  value: string
  onChange: (value: string) => void
  onSearch: () => void
  showSearchButton?: boolean
}

const ListingSearch = ({
  value,
  onChange,
  onSearch,
  showSearchButton = false,
}: ListingSearchProps) => {
  const handleChange = (value: string) => {
    onChange(value)

    if (value.trim() === '') {
      onSearch()
    }
  }

  return (
    <div className="mb-6 flex gap-2">
      <div className="relative flex-1">
        <FiSearch
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />

        <input
          type="text"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSearch()
            }
          }}
          placeholder="Search listings..."
          className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 outline-none focus:ring-2"
        />
      </div>

      {showSearchButton && (
        <button
          type="button"
          onClick={onSearch}
          className="rounded-lg bg-black px-5 py-2 text-white"
        >
          Search
        </button>
      )}
    </div>
  )
}

export default ListingSearch