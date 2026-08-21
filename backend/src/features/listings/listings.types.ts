export type SortOption = 'newest' | 'oldest' | 'price_asc' | 'price_desc'

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

export type Condition = 'New' | 'Used'

export interface Listing {
  id: number
  title: string
  description: string
  condition: Condition
  price: number
  category: Category
  image_url: string | null
  created_at: string
}
