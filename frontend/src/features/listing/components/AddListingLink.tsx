import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'

interface AddListingLinkProps {
  onClick?: () => void
  variant?: 'inline' | 'block'
}

export default function AddListingLink({ onClick, variant = 'inline' }: AddListingLinkProps) {
  const baseClasses =
    'flex items-center gap-2 whitespace-nowrap rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20'

  return (
    <Link
      to="/listings/create"
      onClick={onClick}
      className={`${baseClasses} ${variant === 'block' ? 'w-full' : 'shrink-0'}`}
    >
      <FiPlus size={18} strokeWidth={3} />
      Add Listing
    </Link>
  )
}