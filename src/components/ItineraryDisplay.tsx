import { useItinerary } from '../context/ItineraryContext.tsx'
import { CurrentConversation } from '../types'


export const ItineraryDisplay = ({
  conversation,
}: {
  conversation: CurrentConversation
}): JSX.Element => {

  const { itineraries, createItinerary } = useItinerary()

  return (

    <div className="space-y-4 p-4 overflow-y-auto flex-grow">
      <h2 className="text-2xl font-bold">{conversation.title}</h2>
      <p className="text-gray-600">
        Here's your itinerary for {conversation.title}:
      </p>
      {itineraries?.map((itinerary, i) => (
        <div key={i} className="bg-dim-gray p-4 rounded-lg shadow">
          <h3 className="font-bold">Itinerary {itinerary.titulo}</h3>
        </div>
      ))}
    </div>
  )
}
