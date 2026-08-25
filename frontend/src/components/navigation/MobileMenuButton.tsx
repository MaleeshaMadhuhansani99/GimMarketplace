import { FiMenu, FiX } from 'react-icons/fi'

interface MobileMenuButtonProps {
  open: boolean
  onClick: () => void
}

export default function MobileMenuButton({ open, onClick }: MobileMenuButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? 'Close menu' : 'Open menu'}
      className="flex items-center justify-center rounded-lg p-2 text-white transition hover:bg-white/10 lg:hidden"
    >
      {open ? <FiX size={22} /> : <FiMenu size={22} />}
    </button>
  )
}