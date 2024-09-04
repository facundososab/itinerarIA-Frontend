import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext.tsx'
import { useItinerary } from '../context/ItineraryContext.tsx'
import { NewItineraryButton } from './NewItineraryButton.tsx'
import { CalendarIcon } from '@heroicons/react/24/outline'

export default function ItinerariesSidebar() {
  const { itineraries } = useAuth()
  const { setItineraries, handleSelectItinerary } = useItinerary()
  useEffect(() => {
    itineraries ? setItineraries(itineraries) : null
  }, [itineraries])
  return (
    <div className="w-64 bg-onyx h-screen flex flex-col">
      <div className="p-4">
        <NewItineraryButton />
      </div>
      <div className="overflow-y-auto flex-grow">
        {itineraries?.map((itinerary, i) => (
          <div
            key={i}
            className="p-4 hover:bg-raisin-black-2 cursor-pointer"
            onClick={() => handleSelectItinerary(itinerary.id)}
          >
            <div className="font-medium">{itinerary.title}</div>
            <div className="text-sm text-gray-500 flex items-center">
              <CalendarIcon className="h-4 w-4 mr-2" />
              {itinerary.duration} days
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
