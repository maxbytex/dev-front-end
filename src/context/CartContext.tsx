import { createContext, useContext, useState, type ReactNode } from 'react'

interface ICartContext {
  cartCount: number
  setCartCount: (n: number) => void
}

const CartContext = createContext<ICartContext>({ cartCount: 0, setCartCount: () => {} })

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartCount, setCartCountState] = useState<number>(() =>
    Number(localStorage.getItem('cart_count') ?? 0)
  )

  const setCartCount = (n: number) => {
    localStorage.setItem('cart_count', String(n))
    setCartCountState(n)
  }

  return (
    <CartContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </CartContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  return useContext(CartContext)
}
