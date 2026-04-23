import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import Header from '../components/Header/Header'
import { BreadcrumbProvider } from '../context/BreadcrumbContext'
import { CartProvider } from '../context/CartContext'


function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <MemoryRouter>
      <CartProvider>
        <BreadcrumbProvider>{children}</BreadcrumbProvider>
      </CartProvider>
    </MemoryRouter>
  )
}

describe('Header', () => {
  beforeEach(() => localStorage.clear())

  it('renders the app title as a link', () => {
    render(<Wrapper><Header /></Wrapper>)
    expect(screen.getByRole('link', { name: /itx shop/i })).toBeInTheDocument()
  })

  it('shows cart count from localStorage', () => {
    localStorage.setItem('cart_count', '4')
    render(<Wrapper><Header /></Wrapper>)
    expect(screen.getByText('4')).toBeInTheDocument()
  })

  it('shows ITX SHOP breadcrumb when no label set', () => {
    render(<Wrapper><Header /></Wrapper>)
    expect(screen.getByText('ITX SHOP')).toBeInTheDocument()
  })

 
})
