import type { Listing } from '../../types/listing.types'

interface ListingInfoProps {
  listing: Listing
}

export default function ListingInfo({ listing }: ListingInfoProps) {
  return (
    <div>
      <p className="mb-2 text-sm text-gray-500">{listing.category}</p>

      <h1 className="text-4xl font-bold">{listing.title}</h1>

      <p className="mt-6 text-3xl font-bold">${listing.price}</p>

      <div className="mt-6">
        <p className="text-sm text-gray-500">Condition</p>
        <p className="mt-1 font-medium">{listing.condition}</p>
      </div>

      <div className="mt-8">
        <h2 className="text-sm text-gray-500">Description (Specifications)</h2>
        <p className="mt-1 font-medium">{listing.description}</p>
      </div>

      <p className="mt-8 text-sm text-gray-500">
        Listed on {new Date(listing.created_at).toLocaleDateString()}
      </p>
    </div>
  )
}