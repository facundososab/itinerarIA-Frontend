import ItinerariesSidebar from '../components/ItinerariesSidebar.tsx'
import { ItineraryDisplay } from '../components/ItineraryDisplay.tsx'
import {
  //ItineraryProvider,
  useItinerary,
} from '../context/ItineraryContext.tsx'

export default function ItinerariesPage() {
  const { CurrentItinerary } = useItinerary()
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
          {/* <InputArea onSubmit={handleSubmit} /> */}
        </div>
      </div>
    </div>
  )
}
