import { useNavigate } from 'react-router-dom'
import type { Listing } from '../../types/types'

interface ListingCardProps {
  listing: Listing
}

const ListingCard = ({ listing }: ListingCardProps) => {
   const imageUrl = `${import.meta.env.VITE_BACKEND_URL}/public${listing.image_url}` 
    const navigate = useNavigate()

  return (
    <div
      onClick={() =>
        navigate(`/listings/${listing.id}`)
      }
      className="cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white transition hover:shadow-lg"
    >
      {listing.image_url && (
        <img
          src={imageUrl}
          alt={listing.title}
          className="h-48 w-full object-cover"
        />
      )}

      <div className="p-4">
        <h2 className="font-semibold">
          {listing.title}
        </h2>

        <p className="mt-2 text-lg font-bold">
          ${listing.price}
        </p>

        <p className="mt-1 text-sm text-gray-500">
          {listing.category}
        </p>
      </div>
    </div>
  )
}

export default ListingCard