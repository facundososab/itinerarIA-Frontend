import { useItinerary } from '../context/ItineraryContext.tsx'

export function ItineraryDisplay() {
  const { itineraries, currentConversation } = useItinerary()

  return (
    <div className="space-y-4 p-4 overflow-y-auto flex-grow">
      <h2 className="text-2xl font-bold">{currentConversation?.title}</h2>
      <p className="text-gray-600">
        Here's your itinerary for {currentConversation?.title}:
      </p>
      {currentConversation?.itinerary.map((itinerary, i) => (
        <div key={i} className="bg-dim-gray p-4 rounded-lg shadow">
          {itinerary.activities.map((activity, j) => (
            <div key={j} className="flex items-center space-x-4">
            </div>
          ))}
      ))}
    </div>
  )
}
