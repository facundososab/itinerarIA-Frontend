import { ObjectId } from '@mikro-orm/mongodb'

export default function DeleteParticipantWarningModal({
  onClose,
  onDelete,
  ParticipantId,
}: {
  onClose: () => void
  onDelete: (ParticipantId: ObjectId) => void
  ParticipantId: ObjectId | null
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="rounded-lg shadow-lg p-6 w-full max-w-md bg-raisin-black">
        <h2 className="text-xl font-semibold text-white mb-4 text-center">
          Are you sure you want to delete this participant from your favorites?
        </h2>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-blue-500 text-gray-800 rounded-md py-2 px-4 flex items-center justify-center hover:bg-blue-600 transition duration-200 w-1/2 mr-2"
          >
            Close
          </button>
          <button
            onClick={() => (ParticipantId ? onDelete(ParticipantId) : null)}
            className="bg-red-500 text-white rounded-md py-2 px-4 flex items-center justify-center hover:bg-red-600 transition duration-200 w-1/2 ml-2"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
