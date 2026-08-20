import { useState } from 'react'
import type { Category } from '../../types/types'

interface ListingFormProps {
  onSubmit: (formData: FormData) => void
  loading?: boolean
}

const categories: Category[] = [
  'Mobile Phones',
  'Laptops',
  'Furniture',
  'Kitchen items',
  'Kitchen items',
   'Sports',
   'Books',
   'Gaming',
   'Clothing',
   'Other'
]

const ListingForm = ({
  onSubmit,
  loading = false,
}: ListingFormProps) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] =
    useState('')
const [condition, setCondition] =
    useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] =
    useState<Category | ''>('')
  const [image, setImage] =
    useState<File | null>(null)

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault()

    if (!image) {
      return
    }

    const formData = new FormData()

    formData.append('title', title)
    formData.append(
      'description',
      description,
    )
    formData.append('condition', condition)
    formData.append('price', price)
    formData.append('category', category)
    formData.append('image', image)

    onSubmit(formData)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="mb-2 block font-medium"
        >
          Title
        </label>

        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          placeholder="Enter listing title"
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2"
        />
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="mb-2 block font-medium"
        >
          Description
        </label>

        <textarea
          id="description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          placeholder="Describe your item"
          rows={5}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2"
        />
      </div>

 <div>
        <label
          htmlFor="condition"
          className="mb-2 block font-medium"
        >
          Condition
        </label>

        <input
          id="condition"
          value={condition}
          onChange={(e) =>
            setCondition(e.target.value)
          }
          placeholder="Enter Condition"
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2"
        />
      </div>
      {/* Price */}
      <div>
        <label
          htmlFor="price"
          className="mb-2 block font-medium"
        >
          Price
        </label>

        <input
          id="price"
          type="number"
          min="0"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
          placeholder="Enter price in dollars($)"
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2"
        />
      </div>

      {/* Category */}
      <div>
        <label
          htmlFor="category"
          className="mb-2 block font-medium"
        >
          Category
        </label>

        <select
          id="category"
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value as Category,
            )
          }
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2"
        >
          <option value="">
            Select category
          </option>

          {categories.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* Image */}
      <div>
        <label
          htmlFor="image"
          className="mb-2 block font-medium"
        >
          Image
        </label>

        <input
          id="image"
          type="file"
          accept="image/*"
          required
          onChange={(e) => {
            const file =
              e.target.files?.[0] ?? null

            setImage(file)
          }}
          className="w-full rounded-lg border border-gray-300 px-4 py-2"
        />

        {image && (
          <p className="mt-2 text-sm text-gray-500">
            Selected: {image.name}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-black px-5 py-3 text-white disabled:opacity-50"
      >
        {loading
          ? 'Creating listing...'
          : 'Create Listing'}
      </button>
    </form>
  )
}

export default ListingForm