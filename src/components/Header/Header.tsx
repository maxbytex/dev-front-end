import { Link } from 'react-router-dom'
import { useBreadcrumb } from '../../context/BreadcrumbContext'
import { useCart } from '../../context/CartContext'

export default function Header() {
  const { cartCount } = useCart()
  const { breadcrumb } = useBreadcrumb()

  return (
  
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <Link to="/" className="font-bold text-xl text-gray-900 shrink-0">
            ITX SHOP
          </Link>
          <nav className="flex items-center gap-1 text-sm text-gray-500 min-w-0" aria-label="breadcrumb">
            <Link to="/" className="hover:text-gray-700 shrink-0">Productos</Link>
            {breadcrumb && (
              <>
                <span aria-hidden="true" className="shrink-0">/</span>
                <span className="text-gray-700 truncate">{breadcrumb}</span>
              </>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8H19M7 13L5.4 5M9 21a1 1 0 100-2 1 1 0 000 2zm10 0a1 1 0 100-2 1 1 0 000 2z" />
          </svg>
          <span className="text-sm text-gray-600">Cesta</span>
          <span
            className="bg-blue-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
            aria-label={`${cartCount ?? 0} artículos en la cesta`}
          >
            {cartCount}
          </span>
        </div>
      </div>
    </header>
  )
}
