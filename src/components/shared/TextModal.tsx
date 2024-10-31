import { ObjectId } from '@mikro-orm/mongodb'

export default function TextModal({
  onClose,
  text
}: {
  onClose: () => void
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
            className="bg-blue-500 text-gray-800 rounded-md py-2 px-4 flex items-center justify-center hover:bg-blue-600 transition duration-200 w-1/4 mx-auto"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}