import { Route, Routes } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import ListingsPage from '../features/listing/pages/listings'

function App() {
  return (
    <Layout>
      <Routes>
          <Route path="/" element={<ListingsPage />} />
          {/* <Route path="/listings" element={<ListingsPage />} /> */}
          {/* <Route path="/listings/:id" element={<ListingDetailsPage />} /> */}
        </Routes>
    </Layout>
  )
}

export default App