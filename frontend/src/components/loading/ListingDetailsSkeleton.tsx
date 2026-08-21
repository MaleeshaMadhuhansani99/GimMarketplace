export default function ListingDetailsSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 h-4 w-16 animate-pulse rounded bg-gray-200" />

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="h-125 w-full animate-pulse rounded-xl bg-gray-200" />

        <div className="space-y-4">
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
          <div className="h-10 w-3/4 animate-pulse rounded bg-gray-200" />
          <div className="h-8 w-32 animate-pulse rounded bg-gray-200" />
          <div className="h-16 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-24 w-full animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    </div>
  )
}