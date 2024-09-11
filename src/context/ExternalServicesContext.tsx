import { createContext, ReactNode, useContext, useState } from 'react'
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
    const res = await getAllExternalServicesRequest()
    console.log(res.data.data)
    setExternalServices(res.data.data)
  }

  const getOneExternalService = async (id: ObjectId) => {
    try {
      const res = await getExternalServiceRequest(id)
      console.log(res.data.data)
      setExternalService(res.data.data)
    } catch (err: any) {
      console.log(err)
      setExternalServiceErrors(err.data)
    }
  }

  const createExternalService = async (externalService: ExternalService) => {
    console.log(externalService)
    const res = await createExternalServiceRequest(externalService)
    console.log(res.data.data)
    setExternalServices([...externalServices, ...res.data.data])
  }

  const updateExternalService = async (externalService: ExternalService) => {
    const res = await updateExternalServiceRequest(externalService)
    console.log(res.data.data)
    setExternalService(res.data.data)
  }

  const deleteExternalService = async (id: ObjectId) => {
    const res = await deleteExternalServiceRequest(id)
    //ver que devuelve el delete
    console.log(res.data.data)
    setExternalService(res.data.data)
  }

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
