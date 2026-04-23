import { useState, useEffect, useMemo } from 'react'
import { getProducts } from '../services/api'
import type { IProduct } from '../interfaces/product.interface'

export function useProducts() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getProducts()
      .then(data => setProducts(data))
      .catch(() => setError('Failed to load products'))
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    if (!searchTerm) return products
    const lower = searchTerm.toLowerCase()
    return products.filter(
      p =>
        p.brand.toLowerCase().includes(lower) ||
        p.model.toLowerCase().includes(lower)
    )
  }, [products, searchTerm])

  return { filtered, searchTerm, setSearchTerm, loading, error }
}
