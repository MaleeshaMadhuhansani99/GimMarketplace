import { useState } from 'react'
import { FiUpload, FiX } from 'react-icons/fi'

interface ImageUploadFieldProps {
  onChange: (file: File | null) => void
  error?: string
}

export default function ImageUploadField({ onChange, error }: ImageUploadFieldProps) {
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    onChange(file)

    if (file) {
      setPreview(URL.createObjectURL(file))
    } else {
      setPreview(null)
    }
  }

  const handleClear = () => {
    setPreview(null)
    onChange(null)
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">Image</label>

      {!preview ? (
        <label
          htmlFor="image"
          className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 px-4 py-10 text-center transition hover:border-gray-400"
        >
          <FiUpload size={24} className="mb-2 text-gray-400" />
          <span className="text-sm text-gray-600">Click to upload an image</span>
          <span className="mt-1 text-xs text-gray-400">PNG, JPG up to 5MB</span>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      ) : (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="h-56 w-full rounded-lg object-cover"
          />
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-2 rounded-full bg-black/70 p-1.5 text-white hover:bg-black"
          >
            <FiX size={16} />
          </button>
        </div>
      )}

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}