import { PencilIcon, TrashIcon } from 'lucide-react'
import ExternalService, {
  ExternalServiceStatus,
} from '../../interfaces/ExternalService.ts'
import { ObjectId } from '@mikro-orm/mongodb'
import Place from '../../interfaces/Place.ts'
import { useState } from 'react'

export default function ExternalServiceRow({
  service,
  editingService,
  setEditingService,
  handleUpdate,
  handleEdit,
  setShowDeleteModal,
  setShowAcceptModal,
  setExternalServiceToDelete,
  setExternalServiceToAccept,
  places,
}: {
  service: ExternalService
  places: Place[] | []
  editingService: ExternalService | null
  setEditingService: (service: ExternalService | null) => void
  handleUpdate: () => void
  handleEdit: (service: ExternalService) => void
  setShowDeleteModal: (show: boolean) => void
  setShowAcceptModal: (show: boolean) => void
  setExternalServiceToDelete: (id: ObjectId) => void
  setExternalServiceToAccept: (id: ObjectId) => void
}) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validate = () => {
    const newErrors: { [key: string]: string } = {}

    // Validation for serviceType
    if (!editingService?.serviceType) {
      newErrors.serviceType = 'Service type is required'
    } else if (editingService.serviceType.length < 3) {
      newErrors.serviceType = 'The service type must have at least 3 characters'
    }

    // Validation for name
    if (!editingService?.name) {
      newErrors.name = 'Name is required'
    } else if (editingService.name.length < 3) {
      newErrors.name = 'The name must have at least 3 characters'
    }

    // Validation for description
    if (!editingService?.description) {
      newErrors.description = 'Description is required'
    } else if (editingService.description.length < 3) {
      newErrors.description = 'The description must have at least 3 characters'
    }

    // Validation for address
    if (!editingService?.address) {
      newErrors.address = 'Address is required'
    } else if (editingService.address.length < 3) {
      newErrors.address = 'The address must have at least 3 characters'
    }

    // Validation for place
    if (!editingService?.place) {
      newErrors.place = 'Place is required'
    }

    // Validation for schedule
    if (!editingService?.schedule) {
      newErrors.schedule = 'Schedule is required'
    } else if (editingService.schedule.length < 3) {
      newErrors.schedule = 'The schedule must have at least 3 characters'
    }

    // Validation for website
    const websiteRegex = /^www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/
    if (!editingService?.website) {
      newErrors.website = 'Website is required'
    } else if (!websiteRegex.test(editingService.website)) {
      newErrors.website =
        'Invalid website format. It must start with "www." and have a valid domain.'
    }

    // Validation for phone number
    const telRegex = /^\d{10}$/
    if (!editingService?.phoneNumber) {
      newErrors.phoneNumber = 'Contact phone is required'
    } else if (!telRegex.test(editingService.phoneNumber)) {
      newErrors.phoneNumber =
        'Invalid phone number format. It must be 10 digits.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (validate()) {
      handleUpdate()
      setEditingService(null) // Clear editing state
      setErrors({}) // Clear errors
    }
  }

  return (
    <tr key={service.id.toString()} className="border-b border-[#393a41]">
      <td className="p-3">
        {editingService?.id === service.id ? (
          <>
            <input
              type="text"
              value={editingService.serviceType}
              onChange={(e) =>
                setEditingService({
                  ...editingService,
                  serviceType: e.target.value,
                })
              }
              className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
            />
            {errors.serviceType && (
              <p className="text-red-500 text-xs">{errors.serviceType}</p>
            )}
          </>
        ) : (
          service.serviceType
        )}
      </td>
      <td className="p-3">
        {editingService?.id === service.id ? (
          <>
            <input
              type="text"
              value={editingService.name}
              onChange={(e) =>
                setEditingService({
                  ...editingService,
                  name: e.target.value,
                })
              }
              className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name}</p>
            )}
          </>
        ) : (
          service.name
        )}
      </td>
      <td className="p-3">
        {editingService?.id === service.id ? (
          <>
            <input
              type="text"
              value={editingService.description}
              onChange={(e) =>
                setEditingService({
                  ...editingService,
                  description: e.target.value,
                })
              }
              className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
            />
            {errors.description && (
              <p className="text-red-500 text-xs">{errors.description}</p>
            )}
          </>
        ) : (
          service.description
        )}
      </td>
      <td className="p-3">
        {editingService?.id === service.id ? (
          <>
            <input
              type="text"
              value={editingService.address}
              onChange={(e) =>
                setEditingService({
                  ...editingService,
                  address: e.target.value,
                })
              }
              className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
            />
            {errors.address && (
              <p className="text-red-500 text-xs">{errors.address}</p>
            )}
          </>
        ) : (
          service.address
        )}
      </td>
      <td className="p-3">
        {editingService?.id === service.id ? (
          <>
            <select
              id="place"
              onChange={(e) =>
                setEditingService({
                  ...editingService,
                  place: places.find(
                    (place) => place.id.toString() === e.target.value
                  )!,
                })
              }
              value={editingService.place.id.toString()}
              className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
            >
              <option value="">Select a place</option>
              {places &&
                places.map((place) => (
                  <option key={place.id.toString()} value={place.id.toString()}>
                    {place.name}
                  </option>
                ))}
            </select>
            {errors.place && (
              <p className="text-red-500 text-xs">{errors.place}</p>
            )}
          </>
        ) : (
          service.place.name
        )}
      </td>
      <td className="p-3">
        {editingService?.id === service.id ? (
          <>
            <input
              type="text"
              value={editingService.schedule}
              onChange={(e) =>
                setEditingService({
                  ...editingService,
                  schedule: e.target.value,
                })
              }
              className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
            />
            {errors.schedule && (
              <p className="text-red-500 text-xs">{errors.schedule}</p>
            )}
          </>
        ) : (
          service.schedule
        )}
      </td>
      <td className="p-3">
        {editingService?.id === service.id ? (
          <>
            <input
              type="text"
              value={editingService.website}
              onChange={(e) =>
                setEditingService({
                  ...editingService,
                  website: e.target.value,
                })
              }
              className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
            />
            {errors.website && (
              <p className="text-red-500 text-xs">{errors.website}</p>
            )}
          </>
        ) : (
          service.website
        )}
      </td>
      <td className="p-3">
        {editingService?.id === service.id ? (
          <>
            <input
              type="text"
              value={editingService.phoneNumber}
              onChange={(e) =>
                setEditingService({
                  ...editingService,
                  phoneNumber: e.target.value,
                })
              }
              className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
            />
            {errors.contactPhone && (
              <p className="text-red-500 text-xs">{errors.contactPhone}</p>
            )}
          </>
        ) : (
          service.phoneNumber
        )}
      </td>
      <td className="p-3">
        {editingService?.id === service.id ? (
          <select
            name="status"
            id="status"
            className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
            value={editingService.status}
            onChange={(e) =>
              setEditingService({
                ...editingService,
                status: e.target.value as ExternalServiceStatus,
              })
            }
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="PENDING">PENDING</option>
            <option value="CANCELED">CANCELED</option>
          </select>
        ) : (
          service.status
        )}
      </td>

      <td className="p-3">
        {editingService?.id === service.id ? (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={() => setEditingService(null)}
              className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        ) : service.status === ExternalServiceStatus.Pending ? (
          <button
            className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
            onClick={() => {
              setShowAcceptModal(true)
              setExternalServiceToAccept(service.id)
            }}
          >
            <span className="text-white-400">Accept Request </span>
          </button>
        ) : (
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => handleEdit(service)}
              className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
            >
              <PencilIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setShowDeleteModal(true)
                setExternalServiceToDelete(service.id)
              }}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
        )}
      </td>
    </tr>
  )
}
