import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import ExternalService from '../interfaces/ExternalService.ts'
import {
  createExternalServiceRequest,
  deleteExternalServiceRequest,
  getAllExternalServicesRequest,
  getExternalServiceRequest,
  updateExternalServiceRequest,
} from '../auth/externalService.ts'
import { ObjectId } from '@mikro-orm/mongodb'

export const ExternalServicesContext = createContext({
  externalServices: [] as ExternalService[],
  setExternalServices: (_externalServices: ExternalService[]) => {},
  externalService: null as ExternalService | null,
  setExternalService: (_externalService: ExternalService) => {},
  currentExternalService: null as ExternalService | null,
  setCurrentExternalService: (_currentExternalService: ExternalService) => {},
  getAllExternalServices: () => {},
  getOneExternalService: (_id: ObjectId) => {},
  createExternalService: (_externalService: ExternalService) => {},
  updateExternalService: (_externalService: ExternalService) => {},
  deleteExternalService: (_id: ObjectId) => {},
  externalServiceErrors: [],
  setExternalServiceErrors: (_externalServiceErrors: []) => {},
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

  const [currentExternalService, setCurrentExternalService] =
    useState<ExternalService | null>(null)

  const [externalServiceErrors, setExternalServiceErrors] = useState<[]>([])

  const getAllExternalServices = async () => {
    try {
      const res = await getAllExternalServicesRequest()
      setExternalServices(res.data.data)
    } catch (err: any) {
      const res = await getAllExternalServicesRequest()
      setExternalServices(res.data.data)
    }
  }

  const getOneExternalService = async (id: ObjectId) => {
    try {
      const res = await getExternalServiceRequest(id)
      setExternalService(res.data.data)
    } catch (err: any) {
      setExternalServiceErrors(err.response.data.message)
    }
  }

  const createExternalService = async (externalService: ExternalService) => {
    try {
      const res = await createExternalServiceRequest(externalService)
      setExternalServices([...externalServices, res.data.data])
    } catch (err: any) {
      setExternalServiceErrors(err.response.data.message)
    }
  }

  const updateExternalService = async (externalService: ExternalService) => {
    try {
      const res = await updateExternalServiceRequest(externalService)
      setExternalServices([...externalServices, res.data.data])
    } catch (err: any) {
      setExternalServiceErrors(err.response.data.message)
    }
  }

  const deleteExternalService = async (id: ObjectId) => {
    try {
      const res = await deleteExternalServiceRequest(id)
      setExternalService(res.data.data)
    } catch (err: any) {
      setExternalServiceErrors(err.response.data.message)
    }
  }

  //Elimino msj despues de 2 segundos
  useEffect(() => {
    if (externalServiceErrors.length > 0) {
      const timer = setTimeout(() => {
        setExternalServiceErrors([])
      }, 2000)
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
        createExternalService,
        updateExternalService,
        deleteExternalService,
        currentExternalService,
        setCurrentExternalService,
        externalServiceErrors,
        setExternalServiceErrors,
      }}
    >
      {children}
    </ExternalServicesContext.Provider>
  )
}
