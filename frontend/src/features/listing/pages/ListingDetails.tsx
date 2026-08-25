import {useNavigate, useParams} from 'react-router-dom'
import {FiArrowLeft, FiTrash2} from 'react-icons/fi'
import {useListingDetails} from '../hooks/useListingDetails'
import {useDeleteListing} from '../hooks/useDeleteListing'
import SimilarListings from '../components/SimilarListings'
import ListingImage from '../components/ListingImage'
import ListingInfo from '../components/ListingInfo'
import ListingDetailsSkeleton from '../../../components/loading/ListingDetailsSkeleton'
import NotFoundState from '../../../components/error/NotFoundState'
import ErrorState from '../../../components/error/ErrorState'
import ConfirmDialog from '../../../components/dialog/DeleteListingDialog'
import {useAppSelector} from '../../../store/hooks'

export default function ListingDetails() {
  const {user} = useAppSelector((state) => state.auth)
  const {id} = useParams()
  const navigate = useNavigate()
  const {listing, loading, error} = useListingDetails(id)
  const {
    confirmOpen,
    openConfirm,
    closeConfirm,
    confirmDelete,
    deleting,
    error: deleteError,
  } = useDeleteListing()

  const imageUrl = listing
    ? `${import.meta.env.VITE_BACKEND_URL}/public${listing.image_url}`
    : ''

  if (loading) {
    return <ListingDetailsSkeleton />
  }

  if (error || !listing) {
    return <NotFoundState message={error || 'Listing not found'} />
  }
 const isAuthenticated = user?.id === listing.user_id
 
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 text-sm font-medium text-gray-600 transition hover:text-black"
        >
          <FiArrowLeft size={16} />
          Back
        </button>

        {isAuthenticated && (
          <button
            type="button"
            onClick={openConfirm}
            className="flex items-center gap-1.5 rounded-lg border border-red-500 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-500 hover:text-white"
          >
            <FiTrash2 size={16} />
            Delete listing
          </button>
        )}
      </div>

      {deleteError && (
        <div className="mb-6">
          <ErrorState message={deleteError} />
        </div>
      )}

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <ListingImage
          imageUrl={imageUrl}
          alt={listing.title}
          heightClassName="h-[500px]"
        />

        <ListingInfo listing={listing} />
      </div>

      <SimilarListings
        category={listing.category}
        currentListingId={listing.id}
      />

      <ConfirmDialog
        open={confirmOpen}
        title="Delete this listing?"
        message="This action can't be undone. The listing will be permanently removed."
        confirmLabel="Delete"
        loading={deleting}
        onConfirm={() => confirmDelete(listing.id)}
        onCancel={closeConfirm}
      />
    </div>
  )
}
