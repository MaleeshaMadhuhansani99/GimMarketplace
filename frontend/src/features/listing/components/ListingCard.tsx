import { useNavigate } from 'react-router-dom'
import type { ListingCardProps } from '../../types/listing.types'
import ListingImage from './ListingImage'
import Badge from '../../../components/badge/Badge'
import { formatPrice } from '../../../utils/formatPrice'

const ListingCard = ({ listing }: ListingCardProps) => {
  const imageUrl = `${import.meta.env.VITE_BACKEND_URL}/public${listing.image_url}`
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/listings/${listing.id}`)}
      className="group cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
    >
      <ListingImage
        imageUrl={imageUrl}
        alt={listing.title}
        aspectRatio="aspect-square"
        zoomOnHover
        overlay={
          <>
            {listing.category && (
              <div className="absolute left-2 top-2">
                <Badge>{listing.category}</Badge>
              </div>
            )}
            {listing.condition && (
              <div className="absolute right-2 top-2">
                <Badge variant="dark">{listing.condition}</Badge>
              </div>
            )}
          </>
        }
      />

      <div className="p-3">
        <h2 className="truncate text-sm font-semibold text-gray-900">
          {listing.title}
        </h2>
        <p className="mt-1 text-base font-bold text-gray-900">
          {formatPrice(listing.price)}
        </p>
      </div>
    </div>
  )
}

export default ListingCard