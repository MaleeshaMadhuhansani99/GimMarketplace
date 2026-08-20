export type SortOption = 'newest' | 'oldest' | 'price_asc' | 'price_desc'

export type Category =
  | 'Mobile phones'
  | 'Laptops'
  | 'Furniture'
  | 'Kitchen items'
  | 'Sports'
  | 'Books'
  | 'Gaming'
  | 'Clothing'
  | 'Other'

export interface Listing {
  id: number
  title: string
  description: string
  price: number
  category: Category
  image: string | null
  created_at: string
}