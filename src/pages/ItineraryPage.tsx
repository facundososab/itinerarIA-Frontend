import React, { useState, useCallback } from 'react'
import { MapPinIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { ItinerariesSidebar } from '../components/ItinerariesSidebar.tsx'
import { Conversation, CurrentConversation, ItineraryDay } from '../types'
import { ItineraryDisplay } from '../components/ItineraryDisplay.tsx'

const initialConversations: Conversation[] = [
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

const InputArea: React.FC<{ onSubmit: (input: string) => void }> = ({
  onSubmit,
}) => {
  const [input, setInput] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(input)
    setInput('')
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-raisin-black-2">
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter destination(s) for your trip..."
            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <MapPinIcon className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md py-2 px-4 flex items-center hover:bg-blue-600 transition duration-200"
        >
          <PaperAirplaneIcon className="h-5 w-5 mr-2" />
          Generate Itinerary
        </button>
      </form>
    </div>
  )
}

export default function itinerariesPage() {
  const [conversations, setConversations] =
    useState<Conversation[]>(initialConversations)
  const [currentConversation, setCurrentConversation] =
    useState<CurrentConversation | null>(null)

  const handleNewItinerary = useCallback(() => setCurrentConversation(null), [])

  const handleSelectConversation = useCallback((conv: Conversation) => {
    setCurrentConversation({
      ...conv,
      itinerary: generateMockItinerary(conv.title),
    })
  }, [])

  const handleSubmit = useCallback(
    (input: string) => {
      const newConversation: CurrentConversation = {
        id: conversations.length + 1,
        title: input,
        date: new Date().toISOString().split('T')[0],
        itinerary: generateMockItinerary(input),
      }
      setConversations((prevConversations) => [
        newConversation,
        ...prevConversations,
      ])
      setCurrentConversation(newConversation)
    },
    [conversations]
  )

  return (
    <div className="flex h-screen bg-raisin-black-2">
      <ItinerariesSidebar
        conversations={conversations}
        onSelectConversation={handleSelectConversation}
        onNewItinerary={handleNewItinerary}
      />
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto">
          {currentConversation ? (
            <ItineraryDisplay conversation={currentConversation} />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Enter a destination to generate a new itinerary
            </div>
          )}
          <InputArea onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  )
}
