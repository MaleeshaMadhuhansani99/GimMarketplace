import {useNavigate} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../../store/hooks'
import ListingForm from '../components/ListingForm'
import {createListingThunk} from '../listingsSlice'

export default function CreateListing() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {loading, error} = useAppSelector((state) => state.listings)

  const handleCreateListing = async (formData: FormData) => {
    try {
      const createdListing = await dispatch(
        createListingThunk(formData),
      ).unwrap()
      navigate(`/listings/${createdListing.id}`)
    } catch (error) {
      console.error('Failed to create listing:', error)
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Add your product details</h1>

      <ListingForm
        onSubmit={handleCreateListing}
        loading={loading}
        error={error}
      />
    </div>
  )
}
