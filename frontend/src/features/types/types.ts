export interface Listing {
  id: number
  title: string
  description: string
  condition : string
  price: number
  category: Category
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

export type SortOption =
  | 'newest'
  | 'oldest'
  | 'price_asc'
  | 'price_desc'

export type Category =
  | 'Mobile Phones'
  | 'Laptops'
  | 'Furniture'
  | 'Kitchen items'
  | 'Sports'
  | 'Books'
  | 'Gaming'
  | 'Clothing'
  | 'Other'

export interface ListingFilters {
  category: Category | ''
  minPrice: number | ''
  maxPrice: number | ''
}