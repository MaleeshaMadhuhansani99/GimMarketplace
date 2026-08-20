import { useEffect } from 'react'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../store/hooks'

import {
  fetchListings,
  setSort,
  setCategory,
  setMinPrice,
  setMaxPrice,
  clearFilters,
} from '../listingsSlice'

import type {
  SortOption,
  Category,
} from '@/features/types/types'

import ListingCard from '../components/ListingCard'
import ListingSort from '../components/ListingSort'
import ListingFilters from '../components/ListingFilters'

const ListingsPage = () => {
  const dispatch = useAppDispatch()

  const {
    listings,
    loading,
    error,
    pagination,
    search,
    sort,
    category,
    minPrice,
    maxPrice,
  } = useAppSelector(
    (state) => state.listings,
  )

  useEffect(() => {
    dispatch(
      fetchListings({
        page: 1,
        limit: pagination.limit,
        search,
        sort,
        category,
        minPrice,
        maxPrice,
      }),
    )
  }, [dispatch])

  const handlePageChange = (
    page: number,
  ) => {
    dispatch(
      fetchListings({
        page,
        limit: pagination.limit,
        search,
        sort,
        category,
        minPrice,
        maxPrice,
      }),
    )
  }

  const handleSortChange = (
    value: SortOption,
  ) => {
    dispatch(setSort(value))

    dispatch(
      fetchListings({
        page: 1,
        limit: pagination.limit,
        search,
        sort: value,
        category,
        minPrice,
        maxPrice,
      }),
    )
  }

  const handleCategoryChange = (
    value: Category | '',
  ) => {
    dispatch(setCategory(value))
  }

  const handleMinPriceChange = (
    value: number | '',
  ) => {
    dispatch(setMinPrice(value))
  }

  const handleMaxPriceChange = (
    value: number | '',
  ) => {
    dispatch(setMaxPrice(value))
  }

  const handleApplyFilters = () => {
    dispatch(
      fetchListings({
        page: 1,
        limit: pagination.limit,
        search,
        sort,
        category,
        minPrice,
        maxPrice,
      }),
    )
  }

  const handleClearFilters = () => {
    dispatch(clearFilters())

    dispatch(
      fetchListings({
        page: 1,
        limit: pagination.limit,
        search,
        sort,
        category: '',
        minPrice: '',
        maxPrice: '',
      }),
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">

      {/* Heading + Sort */}
      <ListingSort
        value={sort}
        onChange={handleSortChange}
      />

      {/* Filters */}
      <ListingFilters
        category={category}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onCategoryChange={
          handleCategoryChange
        }
        onMinPriceChange={
          handleMinPriceChange
        }
        onMaxPriceChange={
          handleMaxPriceChange
        }
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
      />

      {/* Loading */}
      {loading && (
        <p className="mb-4">
          Loading listings...
        </p>
      )}

      {/* Error */}
      {error && (
        <p className="mb-4 text-red-500">
          {error}
        </p>
      )}

      {/* Empty state */}
      {!loading &&
        !error &&
        listings?.length === 0 && (
          <p>No listings found.</p>
        )}

      {/* Listings */}
      {!loading &&
        listings.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listings?.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
              />
            ))}
          </div>
        )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">

          {/* Previous */}
          <button
            type="button"
            onClick={() =>
              handlePageChange(
                pagination.page - 1,
              )
            }
            disabled={
              pagination.page === 1
            }
            className="rounded border px-3 py-2 disabled:opacity-50"
          >
            Previous
          </button>

          {/* Page numbers */}
          {Array.from(
            {
              length:
                pagination.totalPages,
            },
            (_, index) => index + 1,
          ).map((page) => (
            <button
              type="button"
              key={page}
              onClick={() =>
                handlePageChange(page)
              }
              className={`rounded border px-3 py-2 ${
                page === pagination.page
                  ? 'bg-black text-white'
                  : ''
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next */}
          <button
            type="button"
            onClick={() =>
              handlePageChange(
                pagination.page + 1,
              )
            }
            disabled={
              pagination.page ===
              pagination.totalPages
            }
            className="rounded border px-3 py-2 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default ListingsPage