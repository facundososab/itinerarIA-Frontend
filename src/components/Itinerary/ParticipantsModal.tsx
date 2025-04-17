import { X, Calendar, AccessibilityIcon, Tag } from 'lucide-react'
import Participant from '../../interfaces/Participant'

export default function ParticipantsModal({
  onClose,
  participants,
}: {
  onClose: () => void
  participants: Participant[]
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1c1c21] rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-indigo-100">Participants</h2>
            <button
              onClick={onClose}
              className="text-indigo-300 hover:text-indigo-100 transition-colors duration-200"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>
          {participants.length > 0 ? (
            <ul className="space-y-6">
              {participants.map((participant, i) => (
                <li key={i} className="bg-[#26262c] rounded-lg p-4 shadow-md">
                  <div className="flex flex-col justify-between items-start mb-2 space-y-2">
                    <h3 className="text-xl font-semibold text-indigo-100">
                      {participant.name}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-indigo-300">
                      <Calendar size={16} />
                      <span>{participant.age} years old</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-indigo-300">
                      <AccessibilityIcon size={16} />
                      <span>
                        {participant.disability
                          ? 'Has disability'
                          : 'No disability'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-indigo-200 mb-2">
                      Preferences
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {/* {participant.preferences.map((preference, j) => (
                        <div
                          key={j}
                          className="px-3 py-1 rounded-full text-sm font-medium bg-indigo-600 text-white flex items-center"
                        >
                          <Tag size={14} className="mr-1" />
                          {preference.name}
                        </div>
                      ))} */}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-indigo-300 text-center py-8">
              No participants available for this itinerary.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
