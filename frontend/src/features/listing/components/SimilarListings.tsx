import { useEffect, useState } from 'react'
import type {
  Category,
  Listing,
} from '../../types/types'
import { getAllListings } from '../listingsApi'
import ListingCard from './ListingCard'

interface SimilarListingsProps {
  category: Category
  currentListingId: number
}

const SimilarListings = ({
  category,
  currentListingId,
}: SimilarListingsProps) => {
  const [listings, setListings] =
    useState<Listing[]>([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState<string | null>(null)

  useEffect(() => {
    const fetchSimilarListings =
      async () => {
        try {
          setLoading(true)
          setError(null)

          const response =
            await getAllListings(
              1,
              5,
              '',
              'newest',
              category,
              '',
              '',
            )

          const similarListings =
            response.data.filter(
              (listing) =>
                listing.id !==
                currentListingId,
            )

          setListings(similarListings)
        } catch (error) {
          setError(
            error instanceof Error
              ? error.message
              : 'Failed to fetch similar listings',
          )
        } finally {
          setLoading(false)
        }
      }

    fetchSimilarListings()
  }, [
    category,
    currentListingId,
  ])

  console.log(listings);
  if (loading) {
    return (
      <section className="mt-16 border-t pt-10">
        <h2 className="mb-6 text-2xl font-bold">
          Similar Listings
        </h2>

        <p className="text-gray-500">
          Loading similar listings...
        </p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="mt-16 border-t pt-10">
        <h2 className="mb-6 text-2xl font-bold">
          Similar Listings
        </h2>

        <p className="text-red-500">
          {error}
        </p>
      </section>
    )
  }

  if (listings.length === 0) {
    return null
  }

  return (
    <section className="mt-16 border-t pt-10">
      <h2 className="mb-6 text-2xl font-bold">
        Similar Listings
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            listing={listing}
          />
        ))}
      </div>
    </section>
  )
}

export default SimilarListings