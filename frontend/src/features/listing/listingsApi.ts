import type { ListingsResponse } from '../types/types'

const API_URL = import.meta.env.VITE_API_URL

export const getAllListings = async (
  page: number,
  limit: number,
): Promise<ListingsResponse> => {
  const response = await fetch(
    `${API_URL}/listings?page=${page}&limit=${limit}`,
  )

  if (!response.ok) {
    throw new Error('Failed to fetch listings')
  }

  return response.json()
}