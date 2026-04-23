import type { ICache } from '../interfaces/api.interface'
import type { IProduct, IProductDetail } from '../interfaces/product.interface'

const CACHE_KEY = 'app_cache'
const TTL = 3_600_000

export function getCache(): ICache | null {
  const raw = localStorage.getItem(CACHE_KEY)
  if (!raw) return null
  const cache: ICache = JSON.parse(raw)
  if (Date.now() > cache.expiresAt) {
    localStorage.removeItem(CACHE_KEY)
    return null
  }
  return cache
}

function writeCache(cache: ICache): void {
  localStorage.setItem(CACHE_KEY, JSON.stringify(cache))
}

export function setProducts(data: IProduct[]): void {
  const existing = getCache()
  writeCache({
    expiresAt: existing?.expiresAt ?? Date.now() + TTL,
    products: data,
    productDetails: existing?.productDetails ?? {},
  })
}

export function setProductDetail(id: string, data: IProductDetail): void {
  const existing = getCache()
  writeCache({
    expiresAt: existing?.expiresAt ?? Date.now() + TTL,
    products: existing?.products ?? null,
    productDetails: { ...(existing?.productDetails ?? {}), [id]: data },
  })
}
