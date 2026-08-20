import {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import type {Listing} from '../../types/types'
import {getListingById} from '../listingsApi'
import SimilarListings from '../components/SimilarListings'

const ListingDetails = () => {
  const {id} = useParams()
  const navigate = useNavigate()

  const [listing, setListing] = useState<Listing | null>(null)

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true)

        const data = await getListingById(Number(id))

        setListing(data)
      } catch (error) {
        setError(
          error instanceof Error ? error.message : 'Failed to fetch listing',
        )
      } finally {
        setLoading(false)
      }
    }

    fetchListing()
  }, [id])

  const imageUrl = listing ? `${import.meta.env.VITE_BACKEND_URL}/public${listing.image_url}` : ''


  if (loading) {
    return <div className="mx-auto max-w-7xl px-4 py-8">Loading listing...</div>
  }

  if (error || !listing) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <p className="text-red-500">{error || 'Listing not found'}</p>

        <button
          onClick={() => navigate('/')}
          className="mt-4 rounded-lg bg-black px-5 py-2 text-white"
        >
          Back to listings
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sm text-gray-600 hover:text-black"
      >
        ← Back
      </button>

      {/* Details */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* Image */}
        <div>
          {imageUrl && (
            <img
              src={imageUrl}
              alt={listing.title}
              className="h-[500px] w-full rounded-xl object-cover"
            />
          )}
        </div>

        {/* Information */}
        <div>
          <p className="mb-2 text-sm text-gray-500">{listing.category}</p>

          <h1 className="text-4xl font-bold">{listing.title}</h1>

          <p className="mt-6 text-3xl font-bold">${listing.price}</p>

          <div className="mt-6">
            <p className="text-sm text-gray-500">Condition</p>

            <p className="mt-1 font-medium">{listing.condition}</p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold">Description</h2>

            <p className="mt-3 leading-7 text-gray-600">
              {listing.description}
            </p>
          </div>

          <p className="mt-8 text-sm text-gray-500">
            Listed on {new Date(listing.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Similar listings */}
      <SimilarListings
        category={listing.category}
        currentListingId={listing.id}
      />
    </div>
  )
}

export default ListingDetails
