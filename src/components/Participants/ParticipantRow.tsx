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
  // Estado para las preferencias seleccionadas
  const [selectedPreferences, setSelectedPreferences] = useState<Preference[]>(
    participant.preferences
  )

  const handlePreferenceToggle = (preference: Preference) => {
    setSelectedPreferences((prev) => {
      const isSelected = prev.some((p) => p.id === preference.id) // Verifica si ya está seleccionada

      const newPreferences = isSelected
        ? prev.filter((p) => p.id !== preference.id) // Deselecciona
        : [...prev, preference] // Selecciona

      // Asegúrate de que el id no sea undefined al crear un nuevo objeto
      if (editingParticipant?.id) {
        setEditingParticipant({
          ...editingParticipant,
          preferences: newPreferences,
        })
      }

      return newPreferences // Actualiza el estado local
    })
  }

  return (
    <tr key={participant.id.toString()} className="border-b border-[#393a41]">
      <td className="p-3">
        {editingParticipant?.id === participant.id ? (
          <input
            type="text"
            value={editingParticipant.name}
            onChange={(e) =>
              setEditingParticipant({
                ...editingParticipant,
                name: e.target.value,
              })
            }
            className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
          />
        ) : (
          participant.name
        )}
      </td>
      <td className="p-3">
        {editingParticipant?.id === participant.id ? (
          <input
            type="number"
            value={editingParticipant.age}
            onChange={(e) =>
              setEditingParticipant({
                ...editingParticipant,
                age: parseInt(e.target.value),
              })
            }
            className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
          />
        ) : (
          participant.age
        )}
      </td>
      <td className="p-3">
        {editingParticipant?.id === participant.id ? (
          <select
            id="disability"
            onChange={(e) =>
              setEditingParticipant({
                ...editingParticipant,
                disability: e.target.value === 'true', // Esto convierte la cadena en un booleano
              })
            }
            value={editingParticipant.disability ? 'true' : 'false'} // Cambia a 'true' o 'false' como cadena
            className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        ) : participant.disability ? (
          'Yes'
        ) : (
          'No'
        )}
      </td>

      <td className="p-3">
        {editingParticipant?.id === participant.id ? (
          <div className="flex flex-wrap gap-2">
            {preferences &&
              preferences.map((preference) => {
                const isSelected = selectedPreferences.some(
                  (p) => p.id === preference.id
                )

                console.log(isSelected)
                return (
                  <label
                    key={preference.id.toString()}
                    className="flex items-center"
                  >
                    <input
                      id={preference.id.toString()}
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {
                        handlePreferenceToggle(preference)
                      }}
                      className="hidden"
                      value={preference.id.toString()}
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
                      {isSelected && <Check size={16} className="ml-2" />}{' '}
                    </button>
                  </label>
                )
              })}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {participant.preferences.length > 0 &&
              participant.preferences.map((preference, i) => (
                <button
                  disabled
                  key={i}
                  className="px-3 py-1 rounded-full text-sm font-medium bg-indigo-600 text-white"
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
              onClick={handleUpdate}
              className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={() => setEditingParticipant(null)}
              className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(participant)}
              className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
            >
              <PencilIcon size={16} />
            </button>
            <button
              onClick={() => {
                setShowModal(true)
                setParticipantToDelete(participant.id)
              }}
              className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
            >
              <TrashIcon size={16} />
            </button>
          </div>
        )}
      </td>
    </tr>
  )
}
