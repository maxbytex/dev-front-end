import { useState } from 'react'
import { addToCart } from '../../services/api'
import { useCart } from '../../context/CartContext'
import { translateColor } from '../../utils/colorTranslations'
import type { IProductDetail } from '../../interfaces/product.interface'

interface ProductActionsProps {
  product: IProductDetail
}

const COLOR_HEX: Record<string, string> = {
  black: '#111111',
  white: '#FFFFFF',
  blue: '#2563EB',
  red: '#DC2626',
  green: '#16A34A',
  yellow: '#EAB308',
  pink: '#EC4899',
  purple: '#9333EA',
  orange: '#EA580C',
  grey: '#6B7280',
  gray: '#6B7280',
  silver: '#C0C0C0',
  gold: '#D4AF37',
  rose: '#FB7185',
  cyan: '#06B6D4',
  coral: '#FF6B6B',
  'dark blue': '#1E3A8A',
  'light blue': '#60A5FA',
  'navy blue': '#1E3A5F',
  'sky blue': '#7DD3FC',
  'dark green': '#14532D',
  'light green': '#86EFAC',
  'forest green': '#228B22',
  'mint green': '#98FF98',
  'dark red': '#7F1D1D',
  'dark gray': '#374151',
  'dark grey': '#374151',
  'light gray': '#E5E7EB',
  'light grey': '#E5E7EB',
  'space gray': '#6B7280',
  'space grey': '#6B7280',
  'dark gold': '#B8860B',
  'rose gold': '#B76E79',
  'pearl white': '#F8F3E8',
  'ceramic white': '#F8F6F0',
  'cloud white': '#F0F4FF',
  'phantom white': '#F5F5F5',
  'gentle black': '#2D2D2D',
  'phantom black': '#1A1A2E',
  'midnight black': '#0D0D0D',
  'mystic black': '#1C1C1E',
  'pure white': '#FAFAFA',
  'sunshine yellow': '#FFD000',
  'fragrant pink': '#FFB6C8',
  'essential white': '#F2F2F2',
  'titanium black': '#2B2B2B',
  'aquamarine green': '#00B4AA',
  'black/silver': '__split_black_silver__',
  'black/blue': '__split_black_blue__',
  'black/red': '__split_black_red__',
  'black/white': '__split_black_white__',
  'various': '__various__',
  'burgundy red': '#800020',
  'wine red': '#722F37',
  'metallic red': '#C0392B',
  'dark red': '#7F1D1D',
  'cherry': '#DE3163',
  'classic white': '#FEFEFE',
  'gentle grey': '#D1D5DB',
  'titanium gray': '#878681',
  'titanium grey': '#878681',
  'graphite black': '#383838',
  'rock black': '#1A1A1A',
  'soft-touch black': '#222222',
  'titan black': '#1C1C1C',
  'sandy silver': '#C2B280',
  'lagoon': '#005F73',
  'pearl': '#EAE0C8',
  'steel': '#71797E',
  'ferrari edition': '#FF2800',
  'ceramic white and pearl red with 3 exchangeable battery covers': '__split_white_red__',
}

const LIGHT_COLORS = new Set(['#FFFFFF', '#F8F6F0', '#F0F4FF', '#F5F5F5', '#F8F3E8', '#E5E7EB', '#C0C0C0', '#D4AF37', '#EAB308'])

const SPECIAL_STYLES: Record<string, string> = {
  '__split_black_silver__': 'linear-gradient(135deg, #111111 50%, #C0C0C0 50%)',
  '__split_black_blue__':   'linear-gradient(135deg, #111111 50%, #2563EB 50%)',
  '__split_black_red__':    'linear-gradient(135deg, #111111 50%, #DC2626 50%)',
  '__split_black_white__':  'linear-gradient(135deg, #111111 50%, #FFFFFF 50%)',
  '__split_white_red__':    'linear-gradient(135deg, #FEFEFE 50%, #DC2626 50%)',
  '__various__': 'linear-gradient(135deg, #DC2626, #EAB308, #16A34A, #2563EB, #9333EA)',
}

function resolveHex(name: string): string {
  return COLOR_HEX[name.toLowerCase()] ?? '#D1D5DB'
}

export default function ProductActions({ product }: ProductActionsProps) {
  const { cartCount, setCartCount } = useCart()
  const [colorCode, setColorCode] = useState<number>(product.options.colors[0]?.code ?? 0)
  const [storageCode, setStorageCode] = useState<number>(product.options.storages[0]?.code ?? 0)
  const [adding, setAdding] = useState(false)

  const hasPrice = !!product.price
  const hasValidColor = product.options.colors.some(c => c.code === colorCode && !!c.name.trim())
  const hasValidStorage = product.options.storages.some(s => s.code === storageCode && !!s.name.trim())
  const canAddToCart = hasPrice && hasValidColor && hasValidStorage

  const handleAddToCart = async () => {
    setAdding(true)
    try {
      const res = await addToCart({ id: product.id, colorCode, storageCode })
      setCartCount(cartCount + res.count)
    } finally {
      setAdding(false)
    }
  }
  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Almacenamiento</label>
        <select
          value={storageCode}
          onChange={e => setStorageCode(Number(e.target.value))}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          {product.options.storages.map(opt => (
            <option key={opt.code} value={opt.code}>
              {opt.name.trim() || 'No disponible'}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
        <div className="flex flex-wrap gap-2">
          {product.options.colors.map(opt => {
            const selected = colorCode === opt.code
            const hex = resolveHex(opt.name)
            const specialStyle = SPECIAL_STYLES[hex]
            const isLight = LIGHT_COLORS.has(hex)
            return (
              <button
                key={opt.code}
                title={translateColor(opt.name)}
                onClick={() => setColorCode(opt.code)}
                className={`w-8 h-8 rounded-sm border-2 transition-all cursor-pointer
                  ${selected ? 'border-blue-500 scale-110 shadow-md' : 'border-transparent hover:border-gray-400'}
                  ${isLight ? 'ring-1 ring-gray-300' : ''}
                `}
                style={specialStyle ? { background: specialStyle } : { backgroundColor: hex }}
                aria-label={translateColor(opt.name)}
                aria-pressed={selected}
              />
            )
          })}
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {translateColor(product.options.colors.find(c => c.code === colorCode)?.name ?? '')}
        </p>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={adding || !canAddToCart}
        className="bg-blue-600 text-white rounded-md px-4 py-2 font-semibold hover:bg-blue-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {!hasPrice ? 'Sin stock' : (!hasValidColor || !hasValidStorage) ? 'Sin stock' : adding ? 'Añadiendo...' : 'AÑADIR'}
      </button>
    </div>
  )
}
