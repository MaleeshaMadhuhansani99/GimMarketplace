import { useEffect, useState } from 'react'
import type { Listing } from '../../types/listing.types'
import { getListingById } from '../listingsApi'

export function useListingDetails(id: string | undefined) {
  const [listing, setListing] = useState<Listing | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getListingById(Number(id))
        setListing(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch listing')
      } finally {
        setLoading(false)
      }
    }

    fetchListing()
  }, [id])

  return { listing, loading, error }
}