import { useEffect, useState } from 'react'
import { usePreference } from '../../context/PreferenceContext'
import Preference from '../../interfaces/Preference'
import { ObjectId } from '@mikro-orm/mongodb'
import { createPortal } from 'react-dom'
import DeletePreferenceWarningModal from './DeletePreferenceWarningModal.tsx'
import PreferenceRow from './PreferenceRow.tsx'

export function PreferenceDisplay() {
  const {
    preferences,
    setPreferences,
    getPreferences,
    deletePreference,
    updatePreference,
    preferenceErrors,
  } = usePreference()

  const [editingPreference, setEditingPreference] = useState<Preference | null>(
    null
  )
  const [preferenceToDelete, setPreferenceToDelete] = useState<ObjectId | null>(
    null
  )
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element | null
      if (editingPreference && target && !target.closest('article')) {
        setEditingPreference(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [editingPreference])

  useEffect(() => {
    const loadPreferences = async () => {
      await getPreferences()
    }
    loadPreferences()
  }, [])

  const handleEdit = (preference: Preference) => {
    setEditingPreference(preference)
  }

  const onDelete = async (id: ObjectId) => {
    await deletePreference(id)
    setPreferences(preferences.filter((preference) => preference.id !== id))
    setShowModal(false)
  }

  const handleUpdate = async () => {
    if (editingPreference) {
      await updatePreference(editingPreference)
      setPreferences(
        preferences.map((preference) =>
          preference.id === editingPreference.id
            ? editingPreference
            : preference
        )
      )
      setEditingPreference(null)
    }
  }

  return (
    <article
      className="p-6 bg-[#1c1c21] text-indigo-100"
      role="region"
      aria-labelledby="preference-display"
    >
      {preferenceErrors.length > 0 && (
        <div
          className="bg-red-900 border-l-4 border-red-500 p-4 mb-6"
          role="alert"
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                role="img"
                aria-labelledby="error-icon"
              >
                <title id="error-icon">Error Icon</title>
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
                  {preferenceErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <table className="w-full bg-[#26262c] rounded-lg overflow-hidden">
        <thead className="bg-[#2f3037]">
          <tr>
            <th className="p-3 text-left text-indigo-200" scope="col">
              Name
            </th>
            <th className="p-3 text-left text-indigo-200" scope="col">
              Description
            </th>
            <th className="p-3 text-right text-indigo-200" scope="col">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {preferences?.map((preference) => (
            <PreferenceRow
              key={preference.id.toString()}
              preference={preference}
              editingPreference={editingPreference}
              handleUpdate={handleUpdate}
              handleEdit={handleEdit}
              setShowModal={setShowModal}
              setEditingPreference={setEditingPreference}
              setPreferenceToDelete={setPreferenceToDelete}
            />
          ))}
        </tbody>
      </table>

      {showModal &&
        createPortal(
          <DeletePreferenceWarningModal
            onClose={() => setShowModal(false)}
            onDelete={onDelete}
            PreferenceId={preferenceToDelete}
          />,
          document.body
        )}
    </article>
  )
}
