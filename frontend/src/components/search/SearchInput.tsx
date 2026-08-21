import { FiSearch } from 'react-icons/fi'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  onSearch: () => void
  placeholder?: string
  showSearchButton?: boolean
}

const SearchInput = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Search...',
  showSearchButton = false,
}: SearchInputProps) => {
  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <FiSearch
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSearch()
          }}
          placeholder={placeholder}
          className="w-full rounded-lg border border-border bg-white py-2 pl-10 pr-4 outline-none focus:ring-2"
        />
      </div>
      {showSearchButton && (
        <button
          type="button"
          onClick={onSearch}
          className="rounded-lg bg-gray-500 px-5 py-2 text-white"
        >
          Search
        </button>
      )}
    </div>
  )
}

export default SearchInput