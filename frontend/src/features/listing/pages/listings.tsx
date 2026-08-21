import {useEffect} from 'react'
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
  } = useAppSelector((state) => state.listings)

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

  const handleCategoryChange = (value: Category | '') => dispatch(setCategory(value))
  const handleMinPriceChange = (value: number | '') => dispatch(setMinPrice(value))
  const handleMaxPriceChange = (value: number | '') => dispatch(setMaxPrice(value))

  const handleApplyFilters = () => fetchWithCurrentFilters()

  const handleClearFilters = () => {
    dispatch(clearFilters())
    fetchWithCurrentFilters({category: '', minPrice: '', maxPrice: ''})
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <ListingSort value={sort} onChange={handleSortChange} />

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

      {loading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
        />
      )}

      {!loading && !error && listings.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
