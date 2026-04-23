import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './router/index'
import { CartProvider } from './context/CartContext'
import { BreadcrumbProvider } from './context/BreadcrumbContext'
import "react-loading-skeleton/dist/skeleton.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <BreadcrumbProvider>
        <Router />
      </BreadcrumbProvider>
    </CartProvider>
  </StrictMode>
)
