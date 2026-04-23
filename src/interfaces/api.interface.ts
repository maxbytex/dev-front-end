import type { IProduct, IProductDetail } from './product.interface'

export interface ICache {
  expiresAt: number
  products: IProduct[] | null
  productDetails: Record<string, IProductDetail>
}
