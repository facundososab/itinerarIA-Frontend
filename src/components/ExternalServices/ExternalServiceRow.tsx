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

    // Validación para tipoServicio
    if (!editingService?.tipoServicio) {
      newErrors.tipoServicio = 'El tipo de servicio es requerido'
    }

    // Validación para nombre
    if (!editingService?.nombre) {
      newErrors.nombre = 'El nombre es requerido'
    }

    // Validación para descripcion
    if (!editingService?.descripcion) {
      newErrors.descripcion = 'La descripción es requerida'
    }

    // Validación para direccion
    if (!editingService?.direccion) {
      newErrors.direccion = 'La dirección es requerida'
    }

    // Validación para lugar
    if (!editingService?.lugar) {
      newErrors.lugar = 'El lugar es requerido'
    }

    // Validación para horario
    if (!editingService?.horario) {
      newErrors.horario = 'El horario es requerido'
    }

    // Validación para sitioWeb
    const websiteRegex = /^www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/
    if (!editingService?.sitioWeb) {
      newErrors.sitioWeb = 'El sitio web es requerido'
    } else if (!websiteRegex.test(editingService.sitioWeb)) {
      newErrors.sitioWeb =
        'El formato del sitio web es inválido. Debe comenzar con "www." y tener un dominio válido.'
    }

    // Validación para telContacto
    if (!editingService?.telContacto) {
      newErrors.telContacto = 'El teléfono de contacto es requerido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (validate()) {
      handleUpdate()
      setEditingService(null) // Limpiar el estado de edición
      setErrors({}) // Limpiar errores
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
            {errors.tipoServicio && (
              <p className="text-red-500 text-xs">{errors.tipoServicio}</p>
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
            {errors.nombre && (
              <p className="text-red-500 text-xs">{errors.nombre}</p>
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
            {errors.descripcion && (
              <p className="text-red-500 text-xs">{errors.descripcion}</p>
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
            {errors.direccion && (
              <p className="text-red-500 text-xs">{errors.direccion}</p>
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
            {errors.lugar && (
              <p className="text-red-500 text-xs">{errors.lugar}</p>
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
            {errors.horario && (
              <p className="text-red-500 text-xs">{errors.horario}</p>
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
            {errors.sitioWeb && (
              <p className="text-red-500 text-xs">{errors.sitioWeb}</p>
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
            {errors.telContacto && (
              <p className="text-red-500 text-xs">{errors.telContacto}</p>
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
