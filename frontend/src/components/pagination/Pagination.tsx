interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const hasPrevious = currentPage > 1
  const hasNext = currentPage < totalPages

  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      <button
        type="button"
        disabled={!hasPrevious}
        onClick={() => onPageChange(currentPage - 1)}
        className="rounded-lg border px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>

      <span className="text-sm text-muted">
        Page {currentPage} of {totalPages}
      </span>

      <button
        type="button"
        disabled={!hasNext}
        onClick={() => onPageChange(currentPage + 1)}
        className="rounded-lg border px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </div>
  )
}