import { useEffect, useState } from 'react'
import { useItinerary } from '../context/ItineraryContext.tsx'
import { NewItineraryButton } from './NewItineraryButton.tsx'
import { CalendarIcon, TrashIcon } from '@heroicons/react/24/outline'
import { createPortal } from 'react-dom'
import DeleteItineraryWarningModal from './DeleteItineraryWarningModal.tsx'
import { useAuth } from '../context/AuthContext.tsx'
import { ObjectId } from '@mikro-orm/mongodb'

export default function ItinerariesSidebar() {
  const { setItineraries, handleSelectItinerary, deleteItinerary } =
    useItinerary()

  const { itineraries } = useAuth()

  useEffect(() => {
    console.log(itineraries, 'itineraries en useeffect')
    itineraries ? setItineraries(itineraries) : null
  }, [itineraries])

  const [showModal, setShowModal] = useState(false)
  const [itineraryToDelete, setItineraryToDelete] = useState<ObjectId | null>(
    null
  )

  const onDelete = (itineraryId: ObjectId) => {
    deleteItinerary(itineraryId)
    setShowModal(false)
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
            className="p-4 hover:bg-raisin-black-2 cursor-pointer flex justify-between items-center"
            onClick={() => handleSelectItinerary(itinerary.id)}
          >
            <div>
              <div className="font-medium">{itinerary.title}</div>
              <div className="text-sm text-gray-500 flex items-center">
                <CalendarIcon className="h-4 w-4 mr-2" />
                {itinerary.duration} days
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation() // Evita que el clic en el botón seleccione el itinerario
                setShowModal(true)
                setItineraryToDelete(itinerary.id)
              }}
              className="p-1 border border-gray-600 rounded-md hover:bg-red-100"
            >
              <TrashIcon className="h-5 w-5 text-red-500" />
            </button>
          </div>
        ))}
      </div>

      {showModal &&
        createPortal(
          <DeleteItineraryWarningModal
            onClose={() => setShowModal(false)}
            onDelete={onDelete}
            itineraryId={itineraryToDelete}
          />,
          document.body
        )}
    </div>
  )
}
