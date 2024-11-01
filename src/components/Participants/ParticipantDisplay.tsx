import { useEffect, useState } from 'react'
import { useParticipant } from '../../context/ParticipantContext'
import Participant from '../../interfaces/Participant'
import { ObjectId } from '@mikro-orm/mongodb'
import { createPortal } from 'react-dom'
import DeleteParticipantWarningModal from '../Participants/DeleteParticipantWarningModal.tsx'
import ParticipantRow from './ParticipantRow.tsx'
import { useAuth } from '../../context/AuthContext.tsx'
import { usePreference } from '../../context/PreferenceContext.tsx'

export function ParticipantsDisplay() {
  const {
    participants,
    setParticipants,
    getAllParticipants,
    deleteParticipant,
    updateParticipant,
    participantErrors,
  } = useParticipant()

  const { getPreferences, preferences } = usePreference()

  useEffect(() => {
    const loadPreferences = async () => {
      await getPreferences()
    }
    loadPreferences()
  }, [])

  const { user } = useAuth()
  const userId = user?.id

  useEffect(() => {
    if (userId) {
      const loadParticipants = async () => {
        await getAllParticipants(userId)
      }
      loadParticipants()
    }
  }, [])

  const [editingParticipant, setEditingParticipant] =
    useState<Participant | null>(null)

  const [participantToDelete, setParticipantToDelete] =
    useState<ObjectId | null>(null)

  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element | null
      if (editingParticipant && target && !target.closest('article')) {
        setEditingParticipant(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [editingParticipant])

  const handleEdit = (participant: Participant) => {
    setEditingParticipant(participant)
  }

  const onDelete = async (id: ObjectId) => {
    await deleteParticipant(id)
    setParticipants(participants.filter((participant) => participant.id !== id))
    setShowModal(false)
  }

  const handleUpdate = async () => {
    if (editingParticipant) {
      await updateParticipant(editingParticipant)
      setParticipants(
        participants.map((participant) =>
          participant.id === editingParticipant.id
            ? editingParticipant
            : participant
        )
      )
      setEditingParticipant(null)
    }
  }

  return (
    <article className="p-6 bg-[#1c1c21] text-indigo-100">
      {participantErrors.length > 0 && (
        <div className="bg-red-900 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                role="img"
                aria-label="Error icon"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-300">
                Oops! There were some errors with your request
              </h3>
              <div className="mt-2 text-sm text-red-200">
                <ul className="list-disc pl-5 space-y-1">
                  {participantErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full bg-[#26262c] rounded-lg overflow-hidden">
          <thead className="bg-[#2f3037]">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Age</th>
              <th className="p-3 text-left">Disability</th>
              <th className="p-3 text-left">Preferences</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {participants?.map((participant) => (
              <ParticipantRow
                key={participant.id.toString()}
                participant={participant}
                editingParticipant={editingParticipant}
                handleUpdate={handleUpdate}
                handleEdit={handleEdit}
                setShowModal={setShowModal}
                setEditingParticipant={setEditingParticipant}
                setParticipantToDelete={setParticipantToDelete}
                preferences={preferences}
              />
            ))}
          </tbody>
        </table>
      </div>

      {showModal &&
        createPortal(
          <DeleteParticipantWarningModal
            onClose={() => setShowModal(false)}
            onDelete={onDelete}
            ParticipantId={participantToDelete}
          />,
          document.body
        )}
    </article>
  )
}
