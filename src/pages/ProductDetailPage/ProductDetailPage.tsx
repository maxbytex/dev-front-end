import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductDetail } from '../../services/api'
import { useBreadcrumb } from '../../context/BreadcrumbContext'
import ProductActions from '../../components/ProductActions/ProductActions'
import Card from '../../components/ui/Card'
import type { IProductDetail } from '../../interfaces/product.interface'

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { setBreadcrumb } = useBreadcrumb()
  const [product, setProduct] = useState<IProductDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    const fetchDetail = async () => {
      try {
        const data = await getProductDetail(id)
        setProduct(data)
      } catch {
        setError('Failed to load product')
      } finally {
        setLoading(false)
      }
    }
    fetchDetail()
  }, [id])

  useEffect(() => {
    if (product) setBreadcrumb(`${product.brand} ${product.model}`)
    return () => setBreadcrumb(null)
  }, [product, setBreadcrumb])

  if (error) {
    return <p className="text-center text-red-500 mt-8">{error}</p>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <Card className="flex items-center justify-center bg-white p-8 min-h-[480px]">
        {loading ? (
          <div className="w-full h-[420px] bg-gray-200 rounded-xl animate-pulse" />
        ) : (
          <img
            src={product!.imgUrl}
            alt={`${product!.brand} ${product!.model}`}
            className="w-full max-h-[420px] object-contain"
          />
        )}
      </Card>

      <Card className="p-6 flex flex-col gap-6">
        {loading ? (
          <div className="animate-pulse flex flex-col gap-4">
            <div className="h-3 w-1/4 bg-gray-200 rounded" />
            <div className="h-7 w-2/3 bg-gray-200 rounded" />
            <div className="h-7 w-1/3 bg-gray-200 rounded" />
            <div className="space-y-2 mt-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded" />
              ))}
            </div>
            <div className="h-10 bg-gray-200 rounded mt-2" />
          </div>
        ) : (
          <>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">{product!.brand}</p>
              <h1 className="text-2xl font-bold text-gray-800 mt-1">{product!.model}</h1>
              <p className="font-bold text-2xl text-gray-800 mt-1">
                {product!.price ? `${parseFloat(product!.price).toFixed(2).replace('.', ',')} €` : 'No disponible'}
              </p>
            </div>
            <ul className="text-sm text-gray-600 space-y-2">
              <li><span className="font-medium text-gray-700">CPU:</span> {product!.cpu? product!.cpu : "-"}</li>
              <li><span className="font-medium text-gray-700">RAM:</span> {product!.ram ? product!.ram : "-"}</li>
              <li><span className="font-medium text-gray-700">Sistema Operativo:</span> {product!.os ? product!.os : "-"}</li>
              <li><span className="font-medium text-gray-700">Resolución de pantalla:</span> {product!.displayResolution ? product!.displayResolution : "-"}</li>
              <li><span className="font-medium text-gray-700">Batería:</span> {product!.battery ? product!.battery : "-"}</li>
              <li><span className="font-medium text-gray-700">Cámaras:</span> {product!.primaryCamera ?product!.primaryCamera : "-"}</li>
              <li><span className="font-medium text-gray-700">Dimensiones:</span> {product!.dimentions ? product!.dimentions : "-"}</li>
              <li><span className="font-medium text-gray-700">Peso:</span> {product!.weight ? `${product!.weight} g` : '-'}</li>
            </ul>
            <ProductActions product={product!} />
          </>
        )}
      </Card>
    </div>
  )
}
