import NewParticipantForm from './NewParticipantForm.tsx'
import { createPortal } from 'react-dom'
import { useState } from 'react'
import { PlusIcon } from 'lucide-react'

export function NewParticipantButton() {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <button
        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200 flex items-center"
        onClick={() => setShowModal(true)}
      >
        <PlusIcon className="h-5 w-5 mr-2" />
        Add New Participant
      </button>
      {showModal &&
        createPortal(
          <NewParticipantForm onClose={() => setShowModal(false)} />,
          document.body
        )}
    </>
  )
}
