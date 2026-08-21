import type { Category, Condition } from '../../types/listing.types'

export interface ListingFormValues {
  title: string
  description: string
  condition: Condition | ''
  price: number | ''
  category: Category | ''
  image: File | null
}

export interface ListingFormErrors {
  title?: string
  description?: string
  condition?: string
  price?: string
  category?: string
  image?: string
}

const MAX_IMAGE_SIZE_MB = 5
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export function validateListingForm(values: ListingFormValues): ListingFormErrors {
  const errors: ListingFormErrors = {}

  const title = values.title.trim()
  if (!title) {
    errors.title = 'Title is required'
  } else if (title.length < 3) {
    errors.title = 'Title must be at least 3 characters'
  } else if (title.length > 100) {
    errors.title = 'Title must be under 100 characters'
  }

  const description = values.description.trim()
  if (!description) {
    errors.description = 'Description is required'
  } else if (description.length < 10) {
    errors.description = 'Description must be at least 10 characters'
  } else if (description.length > 2000) {
    errors.description = 'Description must be under 2000 characters'
  }

  if (!values.condition) {
    errors.condition = 'Please select a condition'
  }

  if (values.price === '') {
    errors.price = 'Price is required'
  } else if (values.price <= 0) {
    errors.price = 'Price must be greater than 0'
  } else if (values.price > 10_000_000) {
    errors.price = 'Price seems too high — please check the value'
  }

  if (!values.category) {
    errors.category = 'Please select a category'
  }

  if (!values.image) {
    errors.image = 'Please upload an image'
  } else {
    if (!ALLOWED_IMAGE_TYPES.includes(values.image.type)) {
      errors.image = 'Image must be JPG, PNG, or WEBP'
    } else if (values.image.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
      errors.image = `Image must be under ${MAX_IMAGE_SIZE_MB}MB`
    }
  }

  return errors
}