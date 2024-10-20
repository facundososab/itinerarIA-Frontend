import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParticipant } from '../../context/ParticipantContext.tsx'
import Participant from '../../interfaces/Participant.ts'
import { X } from 'lucide-react'
import { usePreference } from '../../context/PreferenceContext.tsx'
import Preference from '../../interfaces/Preference.ts'
import { useAuth } from '../../context/AuthContext.tsx'
import { Check } from 'lucide-react'

export default function NewParticipantForm({
  onClose,
}: {
  onClose: () => void
}) {
  const { createFavoriteParticipant, participantErrors } = useParticipant()
  const { preferences, getPreferences } = usePreference()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Participant>()

  useEffect(() => {
    const loadPreferences = async () => {
      getPreferences()
    }
    loadPreferences()
  }, [])

  const [selectedPreferences, setSelectedPreferences] = useState<Preference[]>(
    []
  )

  const { user } = useAuth()

  const onCreate = handleSubmit(async (data) => {
    console.log(data)
    console.log(selectedPreferences)
    if (!user) return
    createFavoriteParticipant({
      ...data,
      preferences: selectedPreferences,
      user: user.id,
    })
    onClose()
  })

  const handlePreferenceToggle = (preference: Preference) => {
    setSelectedPreferences((prev) => {
      if (prev.includes(preference)) {
        return prev.filter((p) => p !== preference)
      } else {
        return [...prev, preference]
      }
    })
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#131316] bg-opacity-75 z-50">
      <div className="bg-[#1c1c21] p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-indigo-300 hover:text-indigo-100 transition-colors duration-200"
          aria-label="Close"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold text-indigo-100 mb-4">
          New Favorite Participant
        </h2>
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

        <form onSubmit={onCreate} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-indigo-300"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register('name', {
                minLength: {
                  value: 3,
                  message: 'Name must be at least 3 characters long',
                },
                maxLength: {
                  value: 20,
                  message: 'Name must be at most 20 characters long',
                },
                required: 'Name is required',
              })}
              className="mt-1 block w-full px-3 py-2 bg-[#26262c] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter name"
            />
            {errors.name?.message && (
              <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="age"
              className="block text-sm font-medium text-indigo-300"
            >
              Age
            </label>
            <input
              id="age"
              type="number"
              {...register('age', {
                min: {
                  value: 0,
                  message: 'Age must be a positive number',
                },
                required: 'Age is required',
              })}
              className="mt-1 block w-full px-3 py-2 bg-[#26262c] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter age"
            />
            {errors.age?.message && (
              <p className="mt-1 text-sm text-red-400">{errors.age.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="disability"
              className="block text-sm font-medium text-indigo-300"
            >
              Disability
            </label>
            <select
              required
              id="disability"
              {...register('disability', {
                setValueAs: (value) => value === 'true', // Convierte el valor a booleano
              })}
              className="mt-1 block w-full px-3 py-2 bg-[#26262c] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select a disability</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            {errors.disability?.message && (
              <p className="mt-1 text-sm text-red-400">
                {errors.disability.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="preferences"
              className="block text-sm font-medium text-indigo-300"
            >
              Preferences
            </label>
            <div className="flex flex-wrap mt-2 space-x-2">
              {preferences &&
                preferences.map((preference) => {
                  const isSelected = selectedPreferences.includes(preference)
                  return (
                    <label
                      key={preference.id.toString()}
                      className="flex items-center"
                    >
                      <input
                        id={preference.id.toString()}
                        type="checkbox"
                        checked={isSelected}
                        onClick={() => handlePreferenceToggle(preference)}
                        className="hidden"
                        value={preference.id.toString()}
                        {...register('preferences')}
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          handlePreferenceToggle(preference)
                        }}
                        className={`flex items-center justify-between px-3 py-1 rounded-full text-sm font-medium hover:ring-2 hover:ring-offset-2 hover:ring-indigo-500 transition-colors duration-200 ${
                          isSelected
                            ? 'bg-indigo-600 text-white'
                            : 'bg-[#26262c] text-indigo-300 hover:bg-indigo-700 hover:text-white'
                        }`}
                      >
                        <span>{preference.name}</span>
                        {isSelected && (
                          <Check size={16} className="ml-2" />
                        )}{' '}
                      </button>
                    </label>
                  )
                })}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Add Participant
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
