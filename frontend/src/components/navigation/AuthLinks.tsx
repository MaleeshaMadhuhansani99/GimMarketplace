import { Link } from 'react-router-dom'

interface AuthLinksProps {
  onLinkClick?: () => void
  layout?: 'row' | 'stacked'
}

export default function AuthLinks({ onLinkClick, layout = 'row' }: AuthLinksProps) {
  const wrapperClasses =
    layout === 'stacked'
      ? 'space-y-2 border-t border-gray-800 pt-4'
      : 'flex items-center gap-2'

  const linkClasses =
    layout === 'stacked'
      ? 'block rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-gray-500'
      : 'rounded-lg px-3 py-2 text-sm font-medium text-white hover:bg-gray-500'

  return (
    <div className={wrapperClasses}>
      <Link to="/login" onClick={onLinkClick} className={linkClasses}>
        Log in
      </Link>
      <Link to="/signup" onClick={onLinkClick} className={linkClasses}>
        Sign up
      </Link>
    </div>
  )
}