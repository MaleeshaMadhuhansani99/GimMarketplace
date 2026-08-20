import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { fetchListings } from '../listingsSlice'
import ListingCard from '../components/ListingCard'

const ListingsPage = () => {
  const dispatch = useAppDispatch()

  const {
    listings,
    loading,
    error,
    pagination,
  } = useAppSelector((state) => state.listings)

  useEffect(() => {
    dispatch(
      fetchListings({
        page: pagination.page,
        limit: pagination.limit,
      }),
    )
  }, [dispatch, pagination.page, pagination.limit])

  const handlePageChange = (page: number) => {
    dispatch(
      fetchListings({
        page,
        limit: pagination.limit,
      }),
    )
  }

  if (loading) {
    return <div>Loading listings...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">
        Listings
      </h1>

      {listings.length === 0 ? (
        <p>No listings found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
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
          <button
            onClick={() =>
              handlePageChange(pagination.page - 1)
            }
            disabled={pagination.page === 1}
            className="rounded border px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          {Array.from(
            { length: pagination.totalPages },
            (_, index) => index + 1,
          ).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`rounded border px-3 py-2 ${
                page === pagination.page
                  ? 'bg-black text-white'
                  : ''
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() =>
              handlePageChange(pagination.page + 1)
            }
            disabled={
              pagination.page === pagination.totalPages
            }
            className="rounded border px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default ListingsPage