// components/badge/Badge.tsx
import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'dark'
}

export default function Badge({ children, variant = 'default' }: BadgeProps) {
  const styles =
    variant === 'dark'
      ? 'bg-black/70 text-white'
      : 'bg-white/90 text-gray-800'

  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-medium backdrop-blur-sm ${styles}`}>
      {children}
    </span>
  )
}