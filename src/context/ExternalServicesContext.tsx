import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import ExternalService, {
  ExternalServiceStatus,
} from '../interfaces/ExternalService.ts'
import {
  createExternalServiceRequest,
  deleteExternalServiceRequest,
  getAllExternalServicesRequest,
  getExternalServiceRequest,
  getExternalServicesByPlaceRequest,
  updateExternalServiceRequest,
  acceptPublicityRequest,
} from '../auth/externalService.ts'
import { ObjectId } from '@mikro-orm/mongodb'

export const ExternalServicesContext = createContext({
  externalServices: [] as ExternalService[],
  setExternalServices: (_externalServices: ExternalService[]) => {},
  externalService: null as ExternalService | null,
  setExternalService: (_externalService: ExternalService) => {},
  getAllExternalServices: () => {},
  getAllExternalServicesByPlace: (_id: ObjectId) => {},
  getOneExternalService: (_id: ObjectId) => {},
  createExternalService: (_externalService: ExternalService) => {},
  updateExternalService: (_externalService: ExternalService) => {},
  deleteExternalService: (_id: ObjectId) => {},
  acceptPublicity: (_id: ObjectId) => {},
  externalServiceErrors: [],
  setExternalServiceErrors: (_externalServiceErrors: []) => {},
  isLoading: true || false,
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
  const [externalServices, setExternalServices] = useState<ExternalService[]>(
    []
  )
  const [externalService, setExternalService] =
    useState<ExternalService | null>(null)

  const [externalServiceErrors, setExternalServiceErrors] = useState<[]>([])

  const [isLoading, setIsLoading] = useState(false)

  const getAllExternalServices = async () => {
    try {
      setIsLoading(true)
      const res = await getAllExternalServicesRequest()
      res && setExternalServices(res.data.data)
    } catch (err: any) {
      setExternalServiceErrors(err.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }

  const getAllExternalServicesByPlace = async (placeId: ObjectId) => {
    try {
      setIsLoading(true)
      const res = await getExternalServicesByPlaceRequest(placeId)
      res && setExternalServices(res.data.data)
    } catch (err: any) {
      console.log(err.response.data.message)
      setExternalServiceErrors(err.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }

  const getOneExternalService = async (id: ObjectId) => {
    try {
      setIsLoading(true)
      const res = await getExternalServiceRequest(id)
      setExternalService(res.data.data)
    } catch (err: any) {
      setExternalServiceErrors(err.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }

  const createExternalService = async (externalService: ExternalService) => {
    try {
      setIsLoading(true)
      const res = await createExternalServiceRequest(externalService)
      setExternalServices((prevExternalServices) => [
        ...(prevExternalServices || []),
        res.data.data,
      ])
    } catch (err: any) {
      console.log(err, 'err')
      setExternalServiceErrors(err.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }

  const updateExternalService = async (externalService: ExternalService) => {
    try {
      setIsLoading(true)
      await updateExternalServiceRequest(externalService)
      setExternalServices(
        externalServices.map((es) =>
          es.id === externalService.id ? externalService : es
        )
      )
    } catch (err: any) {
      setExternalServiceErrors(err.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteExternalService = async (id: ObjectId) => {
    try {
      setIsLoading(true)
      const res = await deleteExternalServiceRequest(id)
      setExternalService(res.data.data)
    } catch (err: any) {
      setExternalServiceErrors(err.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }

  const acceptPublicity = async (id: ObjectId) => {
    try {
      setIsLoading(true)
      await acceptPublicityRequest(id)
      setExternalServices(
        externalServices.map((es) =>
          es.id === id ? { ...es, status: ExternalServiceStatus.Active } : es
        )
      )
    } catch (err: any) {
      setExternalServiceErrors(err.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }
  //Elimino msj despues de 2 segundos
  useEffect(() => {
    if (externalServiceErrors.length > 0) {
      const timer = setTimeout(() => {
        setExternalServiceErrors([])
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [externalServiceErrors])

  return (
    <ExternalServicesContext.Provider
      value={{
        externalServices,
        setExternalServices,
        getAllExternalServices,
        externalService,
        setExternalService,
        getOneExternalService,
        getAllExternalServicesByPlace,
        createExternalService,
        updateExternalService,
        deleteExternalService,
        acceptPublicity,
        externalServiceErrors,
        setExternalServiceErrors,
        isLoading,
      }}
    >
      {children}
    </ExternalServicesContext.Provider>
  )
}
