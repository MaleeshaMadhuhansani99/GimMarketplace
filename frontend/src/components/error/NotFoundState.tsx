import { useNavigate } from 'react-router-dom'

interface NotFoundStateProps {
  message: string
  backTo?: string
  backLabel?: string
}

export default function NotFoundState({
  message,
  backTo = '/',
  backLabel = 'Back to listings',
}: NotFoundStateProps) {
  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <p className="text-red-500">{message}</p>
      <button
        type="button"
        onClick={() => navigate(backTo)}
        className="mt-4 rounded-lg bg-black px-5 py-2 text-white"
      >
        {backLabel}
      </button>
    </div>
  )
}