export interface IProduct {
  id: string
  brand: string
  model: string
  price: string
  imgUrl: string
}

export interface IProductDetail extends IProduct{
  cpu: string
  ram: string
  os: string
  displayResolution: string
  battery: string
  primaryCamera: string
  dimentions: string
  weight: string
  options: {
    colors: Array<{ code: number; name: string }>
    storages: Array<{ code: number; name: string }>
  }
}
