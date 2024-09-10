import { useEffect, useState } from 'react'
import { useItinerary } from '../context/ItineraryContext.tsx'
import { NewItineraryButton } from './NewItineraryButton.tsx'
import { CalendarIcon } from '@heroicons/react/24/outline'
import { createPortal } from 'react-dom'
import DeleteItineraryWarningModal from './DeleteItineraryWarningModal.tsx'
import Itinerary from '../interfaces/Itinerary.ts'
import { useAuth } from '../context/AuthContext.tsx'

export default function ItinerariesSidebar() {
  const {
    setItineraries,
    handleSelectItinerary,
    deleteItinerary,
    CurrentItinerary,
  } = useItinerary()

  const { itineraries } = useAuth()

  useEffect(() => {
    console.log(itineraries, 'itineraries en useeffect')
    itineraries ? setItineraries(itineraries) : null
  }, [itineraries])

  const [showModal, setShowModal] = useState(false)
  const [itineraryToDelete, setItineraryToDelete] = useState<Itinerary | null>()

  const onDelete = () => {
    if (CurrentItinerary) {
      deleteItinerary(CurrentItinerary.id)
    }
  }
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
            <button onClick={() => setShowModal(true)}>
              <span className=" text-red-500">Delete itinerary</span>
            </button>
          </div>
        ))}
      </div>
      {showModal &&
        createPortal(
          <DeleteItineraryWarningModal
            onClose={() => setShowModal(false)}
            onDelete={onDelete}
          />,
          document.body
        )}
    </div>
  )
}
