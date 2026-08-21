interface ErrorStateProps {
  message: string
  onRetry?: () => void
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-center">
      <p className="text-red-600">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white"
        >
          Try again
        </button>
      )}
    </div>
  )
}