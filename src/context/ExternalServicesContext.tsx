import { createContext, ReactNode, useContext } from 'react'
import ExternalService from '../interfaces/ExternalService.ts'

export const ExternalServicesContext = createContext({
  externalServices: null as ExternalService[] | null,
  setExternalServices: (_externalServices: any) => {},
})

export const useExternalServices = () => {
  const context = useContext(ExternalServicesContext)
  if (!context) {
    throw new Error(
      'useExternalServices must be used within a ExternalServicesProvider'
    )
  }
  return context
}

export function ExternalServicesProvider({
  children,
}: {
  children: ReactNode
}) {
  // Define the provider here
  return (
    <ExternalServicesContext.Provider
      value={{ externalServices, setExternalServices }}
    >
      {children}
    </ExternalServicesContext.Provider>
  )
}
