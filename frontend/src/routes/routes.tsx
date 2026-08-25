import ListingsPage from '../features/listing/pages/Listings'
import CreateListing from '../features/listing/pages/CreateListing'
import ListingDetails from '../features/listing/pages/ListingDetails'
import LoginPage from '../features/auth/pages/LoginPage'
import SignupPage from '../features/auth/pages/SignupPage'
import ProtectedRoute from '../features/auth/components/ProtectedRoute'

export const routes = [
  { path: '/', element: <ListingsPage /> },
  { path: '/listings/:id', element: <ListingDetails /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignupPage /> },
  {
    path: '/listings/create',
    element: (
      <ProtectedRoute>
        <CreateListing />
      </ProtectedRoute>
    ),
  },
]