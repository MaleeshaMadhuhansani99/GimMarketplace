import type { Listing } from '../../types/types'

interface ListingCardProps {
  listing: Listing
}

const ListingCard = ({ listing }: ListingCardProps) => {
   const imageUrl = `${import.meta.env.VITE_BACKEND_URL}/public${listing.image_url}` 


  return (
    <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
      <img
        src={imageUrl}
        alt={listing.title}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold">
          {listing.title}
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          {listing.description}
        </p>

        <p className="mt-3 text-lg font-bold">
          ${listing.price}
        </p>

        <span className="mt-2 inline-block text-sm text-gray-500">
          {listing.category}
        </span>
      </div>
    </div>
  )
}

export default ListingCard