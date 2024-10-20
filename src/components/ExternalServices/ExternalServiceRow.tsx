import { PencilIcon, TrashIcon } from 'lucide-react'
import ExternalService from '../../interfaces/ExternalService.ts'
import { ObjectId } from '@mikro-orm/mongodb'
import Place from '../../interfaces/Place.ts'
import { useState } from 'react'

export default function ExternalServiceRow({
  service,
  editingService,
  setEditingService,
  handleUpdate,
  handleEdit,
  setShowModal,
  setExternalServiceToDelete,
  places,
}: {
  service: ExternalService
  places: Place[] | []
  editingService: ExternalService | null
  setEditingService: (service: ExternalService | null) => void
  handleUpdate: () => void
  handleEdit: (service: ExternalService) => void
  setShowModal: (show: boolean) => void
  setExternalServiceToDelete: (id: ObjectId) => void
}) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validate = () => {
    const newErrors: { [key: string]: string } = {}

    // Validation for serviceType
    if (!editingService?.tipoServicio) {
      newErrors.serviceType = 'Service type is required'
    }

    // Validation for name
    if (!editingService?.nombre) {
      newErrors.name = 'Name is required'
    }

    // Validation for description
    if (!editingService?.descripcion) {
      newErrors.description = 'Description is required'
    }

    // Validation for address
    if (!editingService?.direccion) {
      newErrors.address = 'Address is required'
    }

    // Validation for place
    if (!editingService?.lugar) {
      newErrors.place = 'Place is required'
    }

    // Validation for schedule
    if (!editingService?.horario) {
      newErrors.schedule = 'Schedule is required'
    }

    // Validation for website
    const websiteRegex = /^www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/
    if (!editingService?.sitioWeb) {
      newErrors.website = 'Website is required'
    } else if (!websiteRegex.test(editingService.sitioWeb)) {
      newErrors.website =
        'Invalid website format. It must start with "www." and have a valid domain.'
    }

    // Validation for contact phone
    if (!editingService?.telContacto) {
      newErrors.contactPhone = 'Contact phone is required'
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
              value={editingService.tipoServicio}
              onChange={(e) =>
                setEditingService({
                  ...editingService,
                  tipoServicio: e.target.value,
                })
              }
              className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
            />
            {errors.serviceType && (
              <p className="text-red-500 text-xs">{errors.serviceType}</p>
            )}
          </>
        ) : (
          service.tipoServicio
        )}
      </td>
      <td className="p-3">
        {editingService?.id === service.id ? (
          <>
            <input
              type="text"
              value={editingService.nombre}
              onChange={(e) =>
                setEditingService({
                  ...editingService,
                  nombre: e.target.value,
                })
              }
              className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name}</p>
            )}
          </>
        ) : (
          service.nombre
        )}
      </td>
      <td className="p-3">
        {editingService?.id === service.id ? (
          <>
            <input
              type="text"
              value={editingService.descripcion}
              onChange={(e) =>
                setEditingService({
                  ...editingService,
                  descripcion: e.target.value,
                })
              }
              className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
            />
            {errors.description && (
              <p className="text-red-500 text-xs">{errors.description}</p>
            )}
          </>
        ) : (
          service.descripcion
        )}
      </td>
      <td className="p-3">
        {editingService?.id === service.id ? (
          <>
            <input
              type="text"
              value={editingService.direccion}
              onChange={(e) =>
                setEditingService({
                  ...editingService,
                  direccion: e.target.value,
                })
              }
              className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
            />
            {errors.address && (
              <p className="text-red-500 text-xs">{errors.address}</p>
            )}
          </>
        ) : (
          service.direccion
        )}
      </td>
      <td className="p-3">
        {editingService?.id === service.id ? (
          <>
            <select
              id="lugar"
              onChange={(e) =>
                setEditingService({
                  ...editingService,
                  lugar: places.find(
                    (place) => place.id.toString() === e.target.value
                  )!,
                })
              }
              value={editingService.lugar.id.toString()}
              className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
            >
              <option value="">Select a place</option>
              {places &&
                places.map((place) => (
                  <option key={place.id.toString()} value={place.id.toString()}>
                    {place.nombre}
                  </option>
                ))}
            </select>
            {errors.place && (
              <p className="text-red-500 text-xs">{errors.place}</p>
            )}
          </>
        ) : (
          service.lugar.nombre
        )}
      </td>
      <td className="p-3">
        {editingService?.id === service.id ? (
          <>
            <input
              type="text"
              value={editingService.horario}
              onChange={(e) =>
                setEditingService({
                  ...editingService,
                  horario: e.target.value,
                })
              }
              className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
            />
            {errors.schedule && (
              <p className="text-red-500 text-xs">{errors.schedule}</p>
            )}
          </>
        ) : (
          service.horario
        )}
      </td>
      <td className="p-3">
        {editingService?.id === service.id ? (
          <>
            <input
              type="text"
              value={editingService.sitioWeb}
              onChange={(e) =>
                setEditingService({
                  ...editingService,
                  sitioWeb: e.target.value,
                })
              }
              className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
            />
            {errors.website && (
              <p className="text-red-500 text-xs">{errors.website}</p>
            )}
          </>
        ) : (
          service.sitioWeb
        )}
      </td>
      <td className="p-3">
        {editingService?.id === service.id ? (
          <>
            <input
              type="text"
              value={editingService.telContacto}
              onChange={(e) =>
                setEditingService({
                  ...editingService,
                  telContacto: e.target.value,
                })
              }
              className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
            />
            {errors.contactPhone && (
              <p className="text-red-500 text-xs">{errors.contactPhone}</p>
            )}
          </>
        ) : (
          service.telContacto
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
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(service)}
              className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
            >
              <PencilIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setShowModal(true)
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
