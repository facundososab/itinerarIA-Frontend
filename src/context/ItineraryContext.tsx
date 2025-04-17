import {
  createItineraryRequest,
  createItineraryWithIARequest,
  getItineraryRequest,
  updateItineraryRequest,
  deleteItineraryRequest,
  getItinerariesByUserRequest,
} from '../auth/itinerary.ts'
import { createContext, useContext, useEffect, useState } from 'react'
import Itinerary from '../interfaces/Itinerary.ts' // Import the Itinerary type correctly
import { ObjectId } from '@mikro-orm/mongodb'
import { ReactNode } from 'react'
import { useCallback } from 'react'
import { useAuth } from './AuthContext.tsx'

export const ItineraryContext = createContext({
  itineraries: null as Itinerary[] | null,
  setItineraries: (_itineraries: Itinerary[]) => {},
  createItinerary: (_itinerary: Itinerary) => {},
  createItineraryWithIA: (_itinerary: Itinerary) => {},
  getItineraries: (_userId: ObjectId) => {},
  getItinerary: (_id: ObjectId) => {},
  updateItinerary: (_itinerary: Itinerary) => {},
  deleteItinerary: (_id: ObjectId) => {},
  CurrentItinerary: null as Itinerary | null,
  setCurrentItinerary: (_itinerary: Itinerary) => {},
  handleSelectItinerary: (_id: ObjectId) => {},
  itineraryErrors: [] as string[],
  isLoaded: false || true,
  isCreated: false || true,
  isDeleted: false || true,
  isUpdated: false || true,
})

export const useItinerary = () => {
  const context = useContext(ItineraryContext)
  if (!context)
    throw new Error('useItinerary must be used within a ItineraryProvider')
  return context
}

export function ItineraryProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()

  const [itineraries, setItineraries] = useState<Itinerary[] | null>(null)
  const [CurrentItinerary, setCurrentItinerary] = useState<Itinerary | null>(
    null
  )
  const [itineraryErrors, setItineraryErrors] = useState([])
  const [isLoaded, setIsLoaded] = useState(true)
  const [isCreated, setIsCreated] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const [isUpdated, setIsUpdated] = useState(false)
  const handleDeleteItinerary = useCallback(
    () => setCurrentItinerary(null),
    [itineraries]
  )

  const handleSelectItinerary = async (id: ObjectId) => {
    const selectedItinerary = await getItineraryRequest(id)
    console.log(selectedItinerary.data.data)
    selectedItinerary ? setCurrentItinerary(selectedItinerary.data.data) : null
  }

  const createItinerary = async (itinerary: Itinerary) => {
    setIsCreated(false)
    setIsUpdated(false)
    setIsDeleted(false)
    try {
      if (user) {
        itinerary.user = user
      } else {
        throw new Error('User is not logged in')
      }
      const res = await createItineraryRequest(itinerary)
      if (res.status === 201) {
        setCurrentItinerary(res.data.data)
        if (itinerary.user) await getItineraries(itinerary.user.id)
        console.log(itinerary.user)
        setItineraryErrors([])
        console.log(res.data)
        setIsCreated(true)
      }
    } catch (error: any) {
      console.log(error)
      const errorData = error.response.data.message
      setItineraryErrors(errorData)
    }
  }

  const createItineraryWithIA = async (itinerary: Itinerary) => {
    setIsLoaded(false)
    setIsCreated(false)
    setIsUpdated(false)
    setIsDeleted(false)
    try {
      if (user) {
        itinerary.user = user
      } else {
        throw new Error('User is not logged in')
      }
      const res = await createItineraryWithIARequest(itinerary)
      setItineraries([...(itineraries as Itinerary[]), res.data.data])
      setCurrentItinerary(res.data.data)
      if (itinerary.user) await getItineraries(itinerary.user.id)
      setItineraryErrors([])
      setIsCreated(true)
    } catch (error: any) {
      const errorData = error.response.data.message
      console.log(error)
      console.log(errorData)
      setItineraryErrors(errorData)
    } finally {
      setIsLoaded(true)
    }
  }

  const deleteItinerary = async (id: ObjectId) => {
    setIsCreated(false)
    setIsUpdated(false)
    setIsDeleted(false)
    try {
      const res = await deleteItineraryRequest(id)
      if (res.status === 204) {
        itineraries
          ? setItineraries(
              itineraries.filter((itinerary) => itinerary.id !== id)
            )
          : null
        handleDeleteItinerary()
        setIsDeleted(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getItineraries = async (userId: ObjectId) => {
    setIsCreated(false)
    setIsUpdated(false)
    setIsDeleted(false)
    const res = await getItinerariesByUserRequest(userId)
    console.log(res.data.data)
    setItineraries(res.data.data)
  }

  const getItinerary = async (id: ObjectId) => {
    const res = await getItineraryRequest(id)
    setItineraries(res.data.data)
  }

  const updateItinerary = async (itinerary: Itinerary) => {
    setIsCreated(false)
    setIsUpdated(false)
    setIsDeleted(false)
    try {
      const res = await updateItineraryRequest(itinerary)
      const itineraryUpdated: Itinerary = res.data.data
      const newItineraries = itineraries?.map((itinerary) =>
        itinerary.id === itineraryUpdated.id ? itineraryUpdated : itinerary
      )
      itineraries ? setItineraries(newItineraries as Itinerary[]) : null
      //setCurrentItinerary(itineraryUpdated)
      if (itinerary.user) await getItineraries(itinerary.user.id)
      setItineraryErrors([])
      setIsUpdated(true)
    } catch (error: any) {
      const errorData = error.response.data.message
      console.error(error)
      setItineraryErrors(errorData)
    }
  }
  useEffect(() => {
    if (itineraryErrors.length > 0) {
      const timer = setTimeout(() => {
        setItineraryErrors([])
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [itineraryErrors])

  return (
    <ItineraryContext.Provider
      value={{
        itineraries,
        setItineraries,
        getItineraries,
        deleteItinerary,
        createItinerary,
        getItinerary,
        updateItinerary,
        CurrentItinerary,
        handleSelectItinerary,
        itineraryErrors,
        setCurrentItinerary,
        createItineraryWithIA,
        isLoaded,
        isCreated,
        isDeleted,
        isUpdated,
      }}
    >
      {children}
    </ItineraryContext.Provider>
  )
}
