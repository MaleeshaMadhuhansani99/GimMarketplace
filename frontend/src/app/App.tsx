import {Route, Routes} from 'react-router-dom'
import Layout from '../components/layout/Layout'
import ListingsPage from '../features/listing/pages/listings'
import CreateListing from '../features/listing/pages/createListing'
import ListingDetails from '../features/listing/pages/ListingDetails'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ListingsPage />} />
        <Route path="/listings/create" element={<CreateListing />} />
        <Route
          path="/listings/:id"
          element={<ListingDetails />}
        />
      </Routes>
    </Layout>
  )
}

export default App
