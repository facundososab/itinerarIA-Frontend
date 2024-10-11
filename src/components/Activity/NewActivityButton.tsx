import { PlusCircleIcon } from '@heroicons/react/24/outline'
import ActivityForm from './ActivityForm.tsx'
import { createPortal } from 'react-dom'
import React, { useState } from 'react'

export function NewActivityButton() {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <button
        className="w-full bg-blue-500 text-white rounded-md py-2 px-4 flex items-center justify-center hover:bg-blue-600 transition duration-200"
        onClick={() => setShowModal(true)}
      >
        <PlusCircleIcon className="h-5 w-5 mr-2" />
        New Activity
      </button>
      {showModal &&
        createPortal(
          <ActivityForm onClose={() => setShowModal(false)} />,
          document.body
        )}
    </>
  )
}

//modularizo la creacion de un nuevo objeto. Se le pasa el texto del boton y el componente que se va a renderizar al apretarlo
export function NewButton(text: string, Component: React.ComponentType<{ onClose: () => void }>) {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <button
        className="w-full bg-blue-500 text-white rounded-md py-2 px-4 flex items-center justify-center hover:bg-blue-600 transition duration-200"
        onClick={() => setShowModal(true)}
      >
        <PlusCircleIcon className="h-5 w-5 mr-2" />
        {text}
      </button>
      {showModal &&
        createPortal(
          <Component onClose={() => setShowModal(false)} />,
          document.body
        )}
    </>
  )
}