import { PlusCircleIcon } from '@heroicons/react/24/outline'
import NewExternalServiceForm from './NewExternalServiceForm.tsx'
import { createPortal } from 'react-dom'
import { useState } from 'react'

export function NewExternalServiceButton() {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <button
        className="w-full bg-blue-500 text-white rounded-md py-2 px-4 flex items-center justify-center hover:bg-blue-600 transition duration-200"
        onClick={() => setShowModal(true)}
      >
        <PlusCircleIcon className="h-5 w-5 mr-2" />
        New External Service
      </button>
      {showModal &&
        createPortal(
          <NewExternalServiceForm onClose={() => setShowModal(false)} />,
          document.body
        )}
    </>
  )
}
