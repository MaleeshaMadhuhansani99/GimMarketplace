import type {Category, Listing, ListingsResponse} from '../types/listing.types'

const API_URL = import.meta.env.VITE_API_URL

export const getAllListings = async (
  page: number,
  limit: number,
  search: string = '',
  sort: string = 'newest',
  category: Category | '',
  minPrice: number | '',
  maxPrice: number | '',
): Promise<ListingsResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    sort: sort.toString(),
    category: category.toString(),
    minPrice: minPrice.toString(),
    maxPrice: maxPrice.toString(),
  })

  if (search.trim()) {
    params.append('search', search.trim())
  }
  const response = await fetch(`${API_URL}/listings?${params.toString()}`)
  if (!response.ok) {
    throw new Error('Failed to fetch listings')
  }

  return response.json()
}

export const createListing = async (formData: FormData) => {
  const response = await fetch(`${API_URL}/listings/create`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  })

  const result = await response.json()

  if (response.status === 401) {
    throw new Error('Your session has expired. Please log in again.')
  }

  if (!response.ok) {
    throw new Error(result.message || 'Failed to create listing')
  }

  return result.data
}

export const getListingById = async (id: number): Promise<Listing> => {
  const response = await fetch(`${API_URL}/listings/${id}`)

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch listing')
  }

  return data.data
}

export async function deleteListing(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/listings/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  })

  const data = await response.json().catch(() => null)

  if (response.status === 401) {
    throw new Error('Your session has expired. Please log in again.')
  }

  if (!response.ok || !data?.success) {
    throw new Error(data?.message || 'Failed to delete listing')
  }
}
