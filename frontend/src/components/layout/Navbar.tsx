import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { logoutThunk } from '../../features/auth/authSlice'
import ListingSearchContainer from '../../features/listing/components/ListingSearchContainer'
import AddListingLink from '../../features/listing/components/AddListingLink'
import UserMenu from '../navigation/UserMenu'
import AuthLinks from '../navigation/AuthLinks'
import MobileMenuButton from '../navigation/MobileMenuButton'

export default function Navbar() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const closeMobileMenu = () => setMobileMenuOpen(false)

  const handleLogout = async () => {
    await dispatch(logoutThunk())
    closeMobileMenu()
    navigate('/')
  }

  return (
    <nav className="border-b border-border bg-surface">
      <div className="mx-auto max-w-full">
        <div className="flex h-16 items-center justify-between bg-black px-4 sm:px-6 lg:px-8">
          <div className="flex shrink-0 items-center">
            <h2 className="text-lg font-bold text-white">GIMMarketplace</h2>
          </div>

          {/* Desktop nav */}
          <div className="hidden items-center gap-3 lg:flex">
            {isAuthenticated && <AddListingLink />}

            <ListingSearchContainer />

            {isAuthenticated ? (
              <UserMenu name={user?.name} onLogout={handleLogout} layout="row" />
            ) : (
              <AuthLinks layout="row" />
            )}
          </div>

          <MobileMenuButton
            open={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          />
        </div>

        {/* Mobile dropdown panel */}
        {mobileMenuOpen && (
          <div className="space-y-4 border-t border-gray-800 bg-black px-4 py-4 lg:hidden">
            <ListingSearchContainer />

            {isAuthenticated && (
              <AddListingLink onClick={closeMobileMenu} variant="block" />
            )}

            {isAuthenticated ? (
              <UserMenu name={user?.name} onLogout={handleLogout} layout="stacked" />
            ) : (
              <AuthLinks onLinkClick={closeMobileMenu} layout="stacked" />
            )}
          </div>
        )}
      </div>
    </nav>
  )
}