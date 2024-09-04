import {
  createItineraryRequest,
  getItinerariesRequest,
  getItineraryRequest,
  updateItineraryRequest,
  deleteItineraryRequest,
} from '../auth/itinerario'
import { createContext, useContext, useState } from 'react'
import Itinerary from '../interfaces/Itinerary.ts' // Import the Itinerary type correctly
import { ObjectId } from '@mikro-orm/mongodb'
import { ReactNode } from 'react'
import { useCallback } from 'react'
import { ItineraryItem, CurrentItinerary, ItineraryDay } from '../types'

const initialItineraryItems: ItineraryItem[] = [
  { id: 1, title: 'Paris Trip', date: '2023-06-15' },
  { id: 2, title: 'Tokyo Adventure', date: '2023-07-22' },
  { id: 3, title: 'New York City Tour', date: '2023-08-10' },
]

const generateMockItinerary = (title: string): ItineraryDay[] => [
  {
    day: 1,
    activities: [
      `Check-in to hotel in ${title}`,
      'Visit local landmarks',
      'Dinner at a popular restaurant',
    ],
  },
  {
    day: 2,
    activities: [
      'Morning city tour',
      'Afternoon museum visit',
      'Evening cultural show',
    ],
  },
]

export const ItineraryContext = createContext({
  itineraries: null as Itinerary[] | null,
  createItinerary: (_itinerary: Itinerary) => {},
  getItineraries: (_userId: ObjectId) => {},
  getItinerary: (_id: ObjectId) => {},
  updateItinerary: (_itinerary: Itinerary) => {},
  deleteItinerary: (_id: ObjectId) => {},
  ItineraryItems: initialItineraryItems,
  CurrentItinerary: null as CurrentItinerary | null,
  handleNewItinerary: () => {},
  handleSelectItinerary: (_id: ObjectId) => {},
  handleSubmit: (_input: string) => {},
})

export const useItinerary = () => {
  const context = useContext(ItineraryContext)
  if (!context)
    throw new Error('useItinerary must be used within a ItineraryProvider')
  return context
}

export function ItineraryProvider({ children }: { children: ReactNode }) {
  const [itineraries, setItineraries] = useState<Itinerary[]>([])
  const [ItineraryItems, setItineraryItems] = useState<ItineraryItem[]>(
    initialItineraryItems
  )
  const [CurrentItinerary, setCurrentItinerary] =
    useState<CurrentItinerary | null>(null)

  const handleNewItinerary = useCallback(() => setCurrentItinerary(null), [])

  const handleSelectItinerary = useCallback((conv: ItineraryItem) => {
    setCurrentItinerary({
      ...conv,
      itinerary: generateMockItinerary(conv.title),
    })
  }, [])

  const handleSubmit = useCallback(
    (input: string) => {
      const newItineraryItem: CurrentItinerary = {
        id: ItineraryItems.length + 1,
        title: input,
        date: new Date().toISOString().split('T')[0],
        itinerary: generateMockItinerary(input),
      }
      setItineraryItems((prevItineraryItems) => [
        newItineraryItem,
        ...prevItineraryItems,
      ])
      setCurrentItinerary(newItineraryItem)
    },
    [ItineraryItems]
  )

  const createItinerary = async (itinerary: Itinerary) => {
    try {
      const res = await createItineraryRequest(itinerary)
      setItineraries([...itineraries, res.data])
    } catch (error) {
      console.log(error)
    }
  }

  const deleteItinerary = async (id: ObjectId) => {
    try {
      const res = await deleteItineraryRequest(id)
      if (res.status === 204)
        setItineraries(itineraries.filter((itinerary) => itinerary.id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  const getItineraries = async (userId: ObjectId) => {
    const res = await getItinerariesRequest(userId)
    setItineraries(res.data)
  }

  const getItinerary = async (id: ObjectId) => {
    const res = await getItineraryRequest(id)
    setItineraries(res.data)
  }

  const updateItinerary = async (itinerary: Itinerary) => {
    try {
      await updateItineraryRequest(itinerary)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ItineraryContext.Provider
      value={{
        itineraries,
        getItineraries,
        deleteItinerary,
        createItinerary,
        getItinerary,
        updateItinerary,
        ItineraryItems,
        CurrentItinerary,
        handleNewItinerary,
        handleSelectItinerary,
        handleSubmit,
      }}
    >
      {children}
    </ItineraryContext.Provider>
  )
}
