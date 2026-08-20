import type {Category, Listing, ListingsResponse} from '../types/types'

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
  const response = await fetch(
    `${API_URL}/listings?${params.toString()}`,
  )
  if (!response.ok) {
    throw new Error('Failed to fetch listings')
  }

  return response.json()
}

export const createListing = async (
  formData: FormData,
) => {
  const response = await fetch(`${API_URL}/listings/create`, {
    method: 'POST',
    body: formData,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message ||
        'Failed to create listing',
    )
  }

  return data
}

export const getListingById = async (
  id: number,
): Promise<Listing> => {
  const response = await fetch(
    `${API_URL}/listings/${id}`,
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message ||
        'Failed to fetch listing',
    )
  }

  return data.data
}
