import {useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from '../../../store/hooks'
import {
  fetchListings,
  setSort,
  setCategory,
  setMinPrice,
  setMaxPrice,
  clearFilters,
} from '../listingsSlice'
import type {SortOption, Category} from '@/features/types/listing.types'

import ListingCard from '../components/ListingCard'
import ListingSort from '../components/ListingSort'
import ListingFilters from '../components/ListingFilters'
import Pagination from '../../../components/pagination/Pagination'
import ErrorState from '../../../components/error/ErrorState'
import EmptyState from '../../../components/empty-state/EmptyState'
import ListingCardSkeleton from '../../../components/loading/ListingCardSkeleton'
import FilterToggleButton from '../../../components/form/FilterToggleButton'

const LISTINGS_GRID_CLASSES =
  'grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'

const ListingsPage = () => {
  const dispatch = useAppDispatch()
  const [filtersOpen, setFiltersOpen] = useState(false)

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
  } = useAppSelector((state) => state.listings)

  const activeFilterCount = [category, minPrice, maxPrice].filter(
    (v) => v !== '',
  ).length

  const fetchWithCurrentFilters = (
    overrides?: Partial<Parameters<typeof fetchListings>[0]>,
  ) => {
    dispatch(
      fetchListings({
        page: 1,
        limit: pagination.limit,
        search,
        sort,
        category,
        minPrice,
        maxPrice,
        ...overrides,
      }),
    )
  }

  useEffect(() => {
    fetchWithCurrentFilters()
  }, [])

  const handlePageChange = (page: number) => fetchWithCurrentFilters({page})

  const handleSortChange = (value: SortOption) => {
    dispatch(setSort(value))
    fetchWithCurrentFilters({sort: value})
  }

  const handleCategoryChange = (value: Category | '') =>
    dispatch(setCategory(value))
  const handleMinPriceChange = (value: number | '') =>
    dispatch(setMinPrice(value))
  const handleMaxPriceChange = (value: number | '') =>
    dispatch(setMaxPrice(value))

  const handleApplyFilters = () => fetchWithCurrentFilters()

  const handleClearFilters = () => {
    dispatch(clearFilters())
    fetchWithCurrentFilters({category: '', minPrice: '', maxPrice: ''})
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">All Products</h1>

        <div className="flex items-center gap-3">
          <FilterToggleButton
            open={filtersOpen}
            activeCount={activeFilterCount}
            onClick={() => setFiltersOpen((prev) => !prev)}
          />

          <ListingSort value={sort} onChange={handleSortChange} />
        </div>
      </div>

      {filtersOpen && (
        <div className="mb-6">
          <ListingFilters
            category={category}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onCategoryChange={handleCategoryChange}
            onMinPriceChange={handleMinPriceChange}
            onMaxPriceChange={handleMaxPriceChange}
            onApply={handleApplyFilters}
            onClear={handleClearFilters}
          />
        </div>
      )}

      {loading && (
        <div className={LISTINGS_GRID_CLASSES}>
          {Array.from({length: pagination.limit}).map((_, i) => (
            <ListingCardSkeleton key={i} />
          ))}
        </div>
      )}

      {!loading && error && (
        <ErrorState message={error} onRetry={() => fetchWithCurrentFilters()} />
      )}

      {!loading && !error && listings?.length === 0 && (
        <EmptyState
          title="No listings found"
          message="Try adjusting your search or filters to find what you're looking for."
          actionLabel="Clear filters"
          onAction={handleClearFilters}
        />
      )}

      {!loading && !error && listings.length > 0 && (
        <div className={LISTINGS_GRID_CLASSES}>
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}

      {pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}

export default ListingsPage
