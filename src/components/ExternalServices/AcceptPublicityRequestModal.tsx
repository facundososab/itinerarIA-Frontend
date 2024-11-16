import { ObjectId } from '@mikro-orm/mongodb'

export default function AcceptPublicityRequestModal({
  onClose,
  onAccept,
  ExternalServiceId,
}: {
  onClose: () => void
  onAccept: (ExternalServiceId: ObjectId) => void
  ExternalServiceId: ObjectId | null
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="rounded-lg shadow-lg p-6 w-full max-w-md bg-raisin-black">
        <h2 className="text-xl font-semibold text-white mb-4 text-center">
          Are you sure you want to accept this Publicity Request?
        </h2>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-blue-500 text-gray-800 rounded-md py-2 px-4 flex items-center justify-center hover:bg-blue-600 transition duration-200 w-1/2 mr-2"
          >
            Close
          </button>
          <button
            onClick={() =>
              ExternalServiceId ? onAccept(ExternalServiceId) : null
            }
            className="bg-green-500 text-white rounded-md py-2 px-4 flex items-center justify-center hover:bg-green-600 transition duration-200 w-1/2 ml-2"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
