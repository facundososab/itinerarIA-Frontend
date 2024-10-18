import { useEffect } from 'react'
import ItinerariesSidebar from '../components/Itinerary/ItinerariesSidebar.tsx'
import { ItineraryDisplay } from '../components/Itinerary/ItineraryDisplay.tsx'
import {
  //ItineraryProvider,
  useItinerary,
} from '../context/ItineraryContext.tsx'
import { useAuth } from '../context/AuthContext.tsx'

export default function ItinerariesPage() {
  const { user } = useAuth()
  const { CurrentItinerary, getItineraries } = useItinerary()

  useEffect(() => {
    const loadItineraries = async () => {
      if (user) {
        getItineraries(user.id)
      }
    }
    loadItineraries()
  }, [])

  return (
    <div className="flex h-full bg-raisin-black-2">
      <ItinerariesSidebar />
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto">
          {CurrentItinerary ? (
            <ItineraryDisplay />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Select an itinerary to view or create a new one
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
