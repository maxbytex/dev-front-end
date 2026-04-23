import { getCache, setProducts, setProductDetail } from './cache'
import type { IProduct, IProductDetail } from '../interfaces/product.interface'
import type { IAddToCartPayload, ICartResponse } from '../interfaces/cart.interface'

const BASE_URL = 'https://itx-frontend-test.onrender.com'

export async function getProducts(): Promise<IProduct[]> {
  const cache = getCache()
  if (cache?.products) return cache.products
  const res = await fetch(`${BASE_URL}/api/product`)
  const data: IProduct[] = await res.json()
  setProducts(data)
  return data
}

export async function getProductDetail(id: string): Promise<IProductDetail> {
  const cache = getCache()
  if (cache?.productDetails[id]) return cache.productDetails[id]
  const res = await fetch(`${BASE_URL}/api/product/${id}`)
  const data: IProductDetail = await res.json()
  setProductDetail(id, data)
  return data
}

export async function addToCart(payload: IAddToCartPayload): Promise<ICartResponse> {
  const res = await fetch(`${BASE_URL}/api/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return res.json()
}
