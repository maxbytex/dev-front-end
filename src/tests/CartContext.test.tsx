import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { CartProvider, useCart } from '../context/CartContext'


function TestComponent() {
  const { cartCount, setCartCount } = useCart()
  return (
    <div>
      <span data-testid="count">{cartCount}</span>
      <button onClick={() => setCartCount(5)}>Set 5</button>
    </div>
  )
}

describe('CartContext', () => {
  beforeEach(() => localStorage.clear())

  it('initializes cart count as 0 when localStorage is empty', () => {
    render(<CartProvider><TestComponent /></CartProvider>)
    expect(screen.getByTestId('count').textContent).toBe('0')
  })

  it('initializes cart count from localStorage', () => {
    localStorage.setItem('cart_count', '3')
    render(<CartProvider><TestComponent /></CartProvider>)
    expect(screen.getByTestId('count').textContent).toBe('3')
  })

  it('updates cartCount state and persists to localStorage', () => {
    render(<CartProvider><TestComponent /></CartProvider>)
    fireEvent.click(screen.getByRole('button', { name: 'Set 5' }))
    expect(screen.getByTestId('count').textContent).toBe('5')
    expect(localStorage.getItem('cart_count')).toBe('5')
  })
})
