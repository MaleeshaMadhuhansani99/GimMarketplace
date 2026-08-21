import ListingsPage from '../features/listing/pages/Listings'
import CreateListing from '../features/listing/pages/CreateListing'
import ListingDetails from '../features/listing/pages/ListingDetails'

export const routes = [
  { path: '/', element: <ListingsPage /> },
  { path: '/listings/create', element: <CreateListing /> },
  { path: '/listings/:id', element: <ListingDetails /> },
]