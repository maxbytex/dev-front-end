import { act, renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useProducts } from '../hooks/useProducts'
import type { IProduct } from '../interfaces/product.interface'
import * as api from '../services/api'

vi.mock('../services/api')

const mockProducts: IProduct[] = [
  { id: 'ke-gsQbO8qH9PQ-zcdiAJ', brand: 'Acer', model: 'Liquid Zest Plus', price: '200', imgUrl: 'https://itx-frontend-test.onrender.com/images/ke-gsQbO8qH9PQ-zcdiAJ.jpg' },
  { id: 'BZ2w7RjmBQVBEXgZUL0Iu', brand: 'Samsung', model: 'Galaxy J1 (2016)', price: '138', imgUrl: 'https://itx-frontend-test.onrender.com/images/BZ2w7RjmBQVBEXgZUL0Iu.jpg' },
]

describe('useProducts', () => {
  beforeEach(() => vi.mocked(api.getProducts).mockResolvedValue(mockProducts))

  it('returns loading true initially', async () => {
    const { result } = renderHook(() => useProducts())
    expect(result.current.loading).toBe(true)
    await waitFor(() => expect(result.current.loading).toBe(false))
  })

  it('loads products on mount', async () => {
    const { result } = renderHook(() => useProducts())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.filtered).toEqual(mockProducts)
  })

  it('filters by brand (case-insensitive)', async () => {
    const { result } = renderHook(() => useProducts())
    await waitFor(() => expect(result.current.loading).toBe(false))
    act(() => result.current.setSearchTerm('acer'))
    expect(result.current.filtered).toEqual([mockProducts[0]])
  })

  it('filters by model (case-insensitive)', async () => {
    const { result } = renderHook(() => useProducts())
    await waitFor(() => expect(result.current.loading).toBe(false))
    act(() => result.current.setSearchTerm('samsung'))
    expect(result.current.filtered).toEqual([mockProducts[1]])
  })

  it('returns all when search term is empty', async () => {
    const { result } = renderHook(() => useProducts())
    await waitFor(() => expect(result.current.loading).toBe(false))
    act(() => result.current.setSearchTerm(''))
    expect(result.current.filtered).toEqual(mockProducts)
  })


})
