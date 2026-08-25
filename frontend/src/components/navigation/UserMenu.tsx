import { FiLogOut, FiUser } from 'react-icons/fi'

interface UserMenuProps {
  name?: string
  onLogout: () => void
  layout?: 'row' | 'stacked'
}

export default function UserMenu({ name, onLogout, layout = 'row' }: UserMenuProps) {
  if (layout === 'stacked') {
    return (
      <div className="space-y-2 border-t border-gray-800 pt-4">
        <div className="flex items-center gap-1.5 px-1 text-sm text-gray-300">
          <FiUser size={14} />
          {name}
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center gap-1.5 rounded-lg border border-gray-600 px-4 py-2 text-sm text-white transition hover:bg-white/10"
        >
          <FiLogOut size={14} />
          Logout
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <span className="flex items-center gap-1.5 text-sm text-gray-300">
        <FiUser size={14} />
        {name}
      </span>
      <button
        type="button"
        onClick={onLogout}
        className="flex items-center gap-1.5 rounded-lg border border-gray-600 px-3 py-2 text-sm text-white transition hover:bg-white/10"
      >
        <FiLogOut size={14} />
        Logout
      </button>
    </div>
  )
}