import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  fetchListings,
  setSearch,
} from '../../features/listing/listingsSlice'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const dispatch = useAppDispatch()

  const { search, pagination } = useAppSelector(
    (state) => state.listings,
  )

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value

    dispatch(setSearch(value))

    // Refetch all listings when search is cleared
    if (value.trim() === '') {
      dispatch(
        fetchListings({
          page: 1,
          limit: pagination.limit,
          search: '',
          sort: 'newest',
          category: '',
          minPrice: '',
          maxPrice: '',
        }),
      )
    }
  }

  const handleSearch = () => {
    dispatch(
      fetchListings({
        page: 1,
        limit: pagination.limit,
        search: search.trim(),
        sort: 'newest',
        category: '',
        minPrice: '',
        maxPrice: '',
      }),
    )
  } 
  return (
    <nav className="border-b border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center gap-8">
          <div className="flex shrink-0 items-center">
            <h2 className="text-lg font-bold">
              Marketplace
            </h2>
          </div>

          <Link
            to="/listings/create"
            className="rounded-lg bg-black px-4 py-2 text-white"
          >
            Sell
          </Link>

          <div className="flex flex-1 justify-center gap-2">
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch()
                }
              }}
              placeholder="Search listings..."
              className="w-full max-w-xl rounded-lg border border-border px-4 py-2 outline-none focus:ring-2"
            />

            <button
              type="button"
              onClick={handleSearch}
              className="rounded-lg bg-black px-5 py-2 text-white"
            >
              Search
            </button>

          </div>
        </div>
      </div>
    </nav>
  )
}