import { useState } from 'react'
import type { Category, Condition } from '../../types/listing.types'
import { CONDITIONS } from '../../types/listing.types'
import { validateListingForm, type ListingFormErrors } from '../utils/validateListingForm'
import NumericInput from '../../../components/form/NumericInput'
import CategorySelect from './CategorySelect'
import ImageUploadField from './ImageUploadField'
import ErrorState from '../../../components/error/ErrorState'
import FieldError from '../../../components/error/FieldError'

interface ListingFormProps {
  onSubmit: (formData: FormData) => void
  loading?: boolean
  error?: string | null
}

const ListingForm = ({ onSubmit, loading = false, error = null }: ListingFormProps) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [condition, setCondition] = useState<Condition | ''>('')
  const [price, setPrice] = useState<number | ''>('')
  const [category, setCategory] = useState<Category | ''>('')
  const [image, setImage] = useState<File | null>(null)
  const [fieldErrors, setFieldErrors] = useState<ListingFormErrors>({})

  const clearFieldError = (field: keyof ListingFormErrors) => {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const handleTitleChange = (value: string) => {
    setTitle(value)
    clearFieldError('title')
  }

  const handleDescriptionChange = (value: string) => {
    setDescription(value)
    clearFieldError('description')
  }

  const handleConditionChange = (value: Condition) => {
    setCondition(value)
    clearFieldError('condition')
  }

  const handlePriceChange = (value: number | '') => {
    setPrice(value)
    clearFieldError('price')
  }

  const handleCategoryChange = (value: Category | '') => {
    setCategory(value)
    clearFieldError('category')
  }

  const handleImageChange = (file: File | null) => {
    setImage(file)
    clearFieldError('image')
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const errors = validateListingForm({
      title,
      description,
      condition,
      price,
      category,
      image,
    })

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    setFieldErrors({})

    const formData = new FormData()
    formData.append('title', title.trim())
    formData.append('description', description.trim())
    formData.append('condition', condition)
    formData.append('price', String(price))
    formData.append('category', category)
    formData.append('image', image as File)

    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {error && <ErrorState message={error} />}

      {/* Title */}
      <div>
        <label htmlFor="title" className="mb-2 block font-medium">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Enter listing title"
          className={`w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 ${
            fieldErrors.title ? 'border-red-400' : 'border-gray-300'
          }`}
        />
        <FieldError message={fieldErrors.title} />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="mb-2 block font-medium">
          Description (Specifications)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => handleDescriptionChange(e.target.value)}
          placeholder="Describe your item"
          rows={5}
          className={`w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 ${
            fieldErrors.description ? 'border-red-400' : 'border-gray-300'
          }`}
        />
        <FieldError message={fieldErrors.description} />
      </div>

      {/* Condition */}
      <div>
        <label htmlFor="condition" className="mb-2 block font-medium">
          Condition
        </label>
        <select
          id="condition"
          value={condition}
          onChange={(e) => handleConditionChange(e.target.value as Condition)}
          className={`w-full rounded-lg border px-4 py-2 ${
            fieldErrors.condition ? 'border-red-400' : 'border-gray-300'
          }`}
        >
          <option value="">Select condition</option>
          {CONDITIONS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <FieldError message={fieldErrors.condition} />
      </div>

      {/* Price */}
      <div>
        <NumericInput
          label="Price"
          value={price}
          onChange={handlePriceChange}
          placeholder="Enter price in LKR (Rs.)"
        />
        <FieldError message={fieldErrors.price} />
      </div>

      {/* Category */}
      <div>
        <CategorySelect value={category} onChange={handleCategoryChange} />
        <FieldError message={fieldErrors.category} />
      </div>

      {/* Image */}
      <ImageUploadField onChange={handleImageChange} error={fieldErrors.image} />

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-black px-5 py-3 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? 'Creating listing...' : 'Create Listing'}
      </button>
    </form>
  )
}

export default ListingForm