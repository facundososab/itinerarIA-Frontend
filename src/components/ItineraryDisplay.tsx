import { useAuth } from '../context/AuthContext.tsx'
import { useItinerary } from '../context/ItineraryContext.tsx'

export function ItineraryDisplay() {
  const { user } = useAuth()
  const { currentConversation } = useItinerary()
  console.log(user)
  return (
    <div className="space-y-4 p-4 overflow-y-auto flex-grow">
      <h2 className="text-2xl font-bold">{currentConversation?.title}</h2>
      <p className="text-gray-600">
        Here's your itinerary for {currentConversation?.title}:
      </p>
      {
        user?.username && <p className="text-white">{user?.username}</p>
        /* {currentConversation?.itinerary.map((itinerary, i) => (
        <div key={i} className="bg-dim-gray p-4 rounded-lg shadow">
          {itinerary.activities.map((activity, j) => (
            <div key={j} className="flex items-center space-x-4">
              <div>
                <h3 className="font-bold">{activity.}</h3>
                <p className="text-gray-600">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      ))} */
      }
    </div>
  )
}
