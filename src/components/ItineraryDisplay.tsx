import { CurrentConversation } from '../types'

export const ItineraryDisplay: React.FC<{
  conversation: CurrentConversation
}> = ({ conversation }) => (
  <div className="space-y-4 p-4 overflow-y-auto flex-grow">
    <h2 className="text-2xl font-bold">{conversation.title}</h2>
    <p className="text-gray-600">
      Here's your itinerary for {conversation.title}:
    </p>
    {conversation.itinerary.map((day) => (
      <div key={day.day} className="bg-dim-gray p-4 rounded-lg shadow">
        <h3 className="font-bold">Day {day.day}</h3>
        <ul className="list-disc list-inside">
          {day.activities.map((activity, index) => (
            <li key={index}>{activity}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>
)
