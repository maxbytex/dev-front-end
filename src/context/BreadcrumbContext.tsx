import { createContext, useContext, useState, type ReactNode } from 'react'

interface IBreadcrumbContext {
  breadcrumb: string | null
  setBreadcrumb: (label: string | null) => void
}

const BreadcrumbContext = createContext<IBreadcrumbContext>({
  breadcrumb: null,
  setBreadcrumb: () => {},
})

export function BreadcrumbProvider({ children }: { children: ReactNode }) {
  const [breadcrumb, setBreadcrumb] = useState<string | null>(null)
  return (
    <BreadcrumbContext.Provider value={{ breadcrumb, setBreadcrumb }}>
      {children}
    </BreadcrumbContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useBreadcrumb() {
  return useContext(BreadcrumbContext)
}
