import { PencilIcon, TrashIcon } from 'lucide-react'
import { ObjectId } from '@mikro-orm/mongodb'
import Participant from '../../interfaces/Participant.ts'
import { useState } from 'react'
import Preference from '../../interfaces/Preference.ts'
import { Check } from 'lucide-react'

export default function ParticipantRow({
  participant,
  editingParticipant,
  setEditingParticipant,
  handleUpdate,
  handleEdit,
  setShowModal,
  setParticipantToDelete,
  preferences,
}: {
  participant: Participant
  editingParticipant: Participant | null
  setEditingParticipant: (participant: Participant | null) => void
  handleUpdate: () => void
  handleEdit: (participant: Participant) => void
  setShowModal: (show: boolean) => void
  setParticipantToDelete: (id: ObjectId) => void
  preferences: Preference[]
}) {
  // State for selected preferences
  const [selectedPreferences, setSelectedPreferences] = useState<Preference[]>(
    participant.preferences
  )
  // State for errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Error validation
  const validate = () => {
    const newErrors: { [key: string]: string } = {}

    if (!editingParticipant?.name) {
      newErrors.name = 'Name is required'
    }

    if (
      editingParticipant?.age === undefined ||
      editingParticipant?.age < 0 ||
      editingParticipant?.age > 110
    ) {
      newErrors.age =
        'Age is required, must be a positive number, and cannot be greater than 110'
    }

    if (editingParticipant?.disability === undefined) {
      newErrors.disability =
        'You must specify whether the participant has a disability'
    }

    if (selectedPreferences.length === 0) {
      newErrors.preferences = 'You must select at least one preference'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Save changes after validation
  const handleSave = () => {
    if (validate()) {
      handleUpdate()
      setEditingParticipant(null)
      setErrors({}) // Clear errors upon successful save
    }
  }

  const handlePreferenceToggle = (preference: Preference) => {
    setSelectedPreferences((prev) => {
      const isSelected = prev.some((p) => p.id === preference.id)

      const newPreferences = isSelected
        ? prev.filter((p) => p.id !== preference.id)
        : [...prev, preference]

      if (editingParticipant?.id) {
        setEditingParticipant({
          ...editingParticipant,
          preferences: newPreferences,
        })
      }

      return newPreferences
    })
  }

  return (
    <tr key={participant.id.toString()} className="border-b border-[#393a41]">
      <td className="p-3">
        {editingParticipant?.id === participant.id ? (
          <>
            <input
              type="text"
              value={editingParticipant.name}
              onChange={(e) =>
                setEditingParticipant({
                  ...editingParticipant,
                  name: e.target.value,
                })
              }
              className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full min-w-[150px]"
              aria-label="Participant name"
              required
            />
            {errors.name && (
              <p className="text-red-500 text-xs" role="alert">
                {errors.name}
              </p>
            )}
          </>
        ) : (
          <span>{participant.name}</span>
        )}
      </td>
      <td className="p-3">
        {editingParticipant?.id === participant.id ? (
          <>
            <input
              type="number"
              value={editingParticipant.age}
              onChange={(e) =>
                setEditingParticipant({
                  ...editingParticipant,
                  age: parseInt(e.target.value),
                })
              }
              className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full min-w-[50px]"
              aria-label="Participant age"
              required
            />
            {errors.age && (
              <p className="text-red-500 text-xs" role="alert">
                {errors.age}
              </p>
            )}
          </>
        ) : (
          <span>{participant.age}</span>
        )}
      </td>
      <td className="p-3">
        {editingParticipant?.id === participant.id ? (
          <>
            <select
              id="disability"
              onChange={(e) =>
                setEditingParticipant({
                  ...editingParticipant,
                  disability: e.target.value === 'true',
                })
              }
              value={editingParticipant.disability ? 'true' : 'false'}
              className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full min-w-[75px]"
              aria-label="Disability status"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            {errors.disability && (
              <p className="text-red-500 text-xs" role="alert">
                {errors.disability}
              </p>
            )}
          </>
        ) : participant.disability ? (
          <span>Yes</span>
        ) : (
          <span>No</span>
        )}
      </td>
      {/* Preferences */}
      <td className="p-3">
        {editingParticipant?.id === participant.id ? (
          <div className="flex flex-wrap gap-2">
            {preferences &&
              preferences.map((preference) => {
                const isSelected = selectedPreferences.some(
                  (p) => p.id === preference.id
                )

                return (
                  <label
                    key={preference.id.toString()}
                    className="flex items-center"
                  >
                    <input
                      id={preference.id.toString()}
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handlePreferenceToggle(preference)}
                      className="hidden"
                      aria-label={`Select ${preference.name} preference`}
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        handlePreferenceToggle(preference)
                      }}
                      className={`flex items-center justify-between px-3 py-1 rounded-full text-sm font-medium hover:ring-2 hover:ring-offset-2 hover:ring-indigo-500 transition-colors duration-200 ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-[#2f3037] text-indigo-300 hover:bg-indigo-700 hover:text-white'
                      }`}
                    >
                      <span>{preference.name}</span>
                      {isSelected && <Check size={16} className="ml-2" />}
                    </button>
                  </label>
                )
              })}
            {errors.preferences && (
              <p className="text-red-500 text-xs" role="alert">
                {errors.preferences}
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {participant.preferences.length > 0 &&
              participant.preferences.map((preference, i) => (
                <button
                  disabled
                  key={i}
                  className="px-3 py-1 rounded-full text-sm font-medium bg-indigo-600 text-white"
                  aria-label={`Preference ${preference.name}`}
                >
                  {preference.name}
                </button>
              ))}
          </div>
        )}
      </td>

      <td className="p-3">
        {editingParticipant?.id === participant.id ? (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
              aria-label="Save changes"
            >
              Save
            </button>
            <button
              onClick={() => setEditingParticipant(null)}
              className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
              aria-label="Cancel editing"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(participant)}
              className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
              aria-label="Edit participant"
            >
              <PencilIcon size={16} />
            </button>
            <button
              onClick={() => {
                setShowModal(true)
                setParticipantToDelete(participant.id)
              }}
              className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
              aria-label="Delete participant"
            >
              <TrashIcon size={16} />
            </button>
          </div>
        )}
      </td>
    </tr>
  )
}
