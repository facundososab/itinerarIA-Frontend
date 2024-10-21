import { ObjectId } from '@mikro-orm/mongodb'

export default function DeleteWarningModal({
  onClose,
  onDelete,
  id,
  text
}: {
  onClose: () => void
  onDelete: (id: ObjectId) => void
  id: ObjectId | null
  text: string
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="rounded-lg shadow-lg p-6 w-full max-w-md bg-raisin-black">
        <h2 className="text-xl font-semibold text-white mb-4 text-center">
          {text}
        </h2>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-blue-500 text-gray-800 rounded-md py-2 px-4 flex items-center justify-center hover:bg-blue-600 transition duration-200 w-1/2 mr-2"
          >
            Close
          </button>
          <button
            onClick={() => (id ? onDelete(id) : null)}
            className="bg-red-500 text-white rounded-md py-2 px-4 flex items-center justify-center hover:bg-red-600 transition duration-200 w-1/2 ml-2"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
