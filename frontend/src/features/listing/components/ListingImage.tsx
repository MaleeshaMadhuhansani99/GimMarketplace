// features/listing/components/ListingImage.tsx
import type { ReactNode } from 'react'

interface ListingImageProps {
  imageUrl: string
  alt: string
  aspectRatio?: string 
  heightClassName?: string 
  zoomOnHover?: boolean
  overlay?: ReactNode   
}

export default function ListingImage({
  imageUrl,
  alt,
  aspectRatio,
  heightClassName,
  zoomOnHover = false,
  overlay,
}: ListingImageProps) {
  if (!imageUrl) return null

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl bg-gray-100 ${
        aspectRatio ?? heightClassName ?? ''
      }`}
    >
      <img
        src={imageUrl}
        alt={alt}
        className={`h-full w-full object-cover ${
          zoomOnHover ? 'transition-transform duration-300 group-hover:scale-105' : ''
        }`}
      />
      {overlay}
    </div>
  )
}