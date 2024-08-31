import { PlusCircleIcon, CalendarIcon } from '@heroicons/react/24/outline'
import { Conversation } from '../types'

export const ItinerariesSidebar: React.FC<{
  conversations: Conversation[]
  onSelectConversation: (conv: Conversation) => void
  onNewItinerary: () => void
}> = ({ conversations, onSelectConversation, onNewItinerary }) => (
  <div className="w-64 bg-onyx h-screen flex flex-col">
    <div className="p-4">
      <button
        className="w-full bg-blue-500 text-white rounded-md py-2 px-4 flex items-center justify-center hover:bg-blue-600 transition duration-200"
        onClick={onNewItinerary}
      >
        <PlusCircleIcon className="h-5 w-5 mr-2" />
        New Itinerary
      </button>
    </div>
    <div className="overflow-y-auto flex-grow">
      {conversations.map((conv) => (
        <div
          key={conv.id}
          className="p-4 hover:bg-raisin-black-2 cursor-pointer"
          onClick={() => onSelectConversation(conv)}
        >
          <div className="font-medium">{conv.title}</div>
          <div className="text-sm text-gray-500 flex items-center">
            <CalendarIcon className="h-4 w-4 mr-2" />
            {conv.date}
          </div>
        </div>
      ))}
    </div>
  </div>
)
