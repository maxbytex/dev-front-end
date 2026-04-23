import { useState, useEffect } from 'react'
import { getProductDetail } from '../services/api'
import type { IProductDetail } from '../interfaces/product.interface'

export function useProductDetail(id: string) {
  const [product, setProduct] = useState<IProductDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true)
    getProductDetail(id)
      .then(setProduct)
      .catch(() => setError('Failed to load product'))
      .finally(() => setLoading(false))
  }, [id])

  return { product, loading, error }
}
