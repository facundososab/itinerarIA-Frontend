import React, { useState } from 'react'
import { MapPinIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'

export const InputArea: React.FC<{ onSubmit: (input: string) => void }> = ({
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
