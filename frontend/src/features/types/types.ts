export interface Listing {
  id: number
  title: string
  description: string
  price: number
  category: string
  image_url: string
  created_at: string
}

export interface PaginationProps {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface ListingsResponse {
  data: Listing[]
  pagination: PaginationProps
}