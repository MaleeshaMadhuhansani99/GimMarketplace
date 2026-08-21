import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteListing } from '../listingsApi'

export function useDeleteListing() {
  const navigate = useNavigate()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const openConfirm = () => setConfirmOpen(true)
  const closeConfirm = () => setConfirmOpen(false)

  const confirmDelete = async (id: number) => {
    try {
      setDeleting(true)
      setError(null)
      await deleteListing(id)
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete listing')
    } finally {
      setDeleting(false)
      setConfirmOpen(false)
    }
  }

  return { confirmOpen, openConfirm, closeConfirm, confirmDelete, deleting, error }
}