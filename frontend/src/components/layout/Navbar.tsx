import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'
import ListingSearchContainer from '../../features/listing/components/ListingSearchContainer'

export default function Navbar() {
  return (
    <nav className="border-b border-border bg-surface">
      <div className="mx-auto max-w-full">
        <div className="flex h-16 items-center justify-between bg-black px-4 sm:px-6 lg:px-8">
          <div className="flex shrink-0 items-center">
            <h2 className="text-white text-lg font-bold">GIMMarketplace</h2>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/listings/create"
              className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-black px-4 py-2 text-white"
            >
              <FiPlus size={18} strokeWidth={3} />
              Add Product
            </Link>

            <ListingSearchContainer />
          </div>
        </div>
      </div>
    </nav>
  )
}