import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from '../App'
import ProductListPage from '../pages/ProductListPage/ProductListPage'
import ProductDetailPage from '../pages/ProductDetailPage/ProductDetailPage'

export default function Router() {
  return (
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </App>
    </BrowserRouter>
  )
}
