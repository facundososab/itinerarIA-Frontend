import { useEffect, useState } from 'react'
import { useExternalServices } from '../../context/ExternalServicesContext'
import ExternalService from '../../interfaces/ExternalService'
import { ObjectId } from '@mikro-orm/mongodb'
import { createPortal } from 'react-dom'
import DeleteExternalServiceWarningModal from './DeleteExternalServiceWarningModal.tsx'
import ExternalServiceRow from './ExternalServiceRow.tsx'
import { usePlace } from '../../context/PlaceContext.tsx'

export function ExternalServicesDisplay() {
  const {
    externalServices,
    setExternalServices,
    getAllExternalServices,
    deleteExternalService,
    updateExternalService,
    externalServiceErrors,
  } = useExternalServices()

  const { places, getPlaces } = usePlace()

  useEffect(() => {
    const loadPlaces = async () => {
      await getPlaces()
    }
    loadPlaces()
  }, [])

  const [editingService, setEditingService] = useState<ExternalService | null>(
    null
  )

  const [externalServiceToDelete, setExternalServiceToDelete] =
    useState<ObjectId | null>(null)

  const [showModal, setShowModal] = useState(false)

  // Cerrar el formulario de edición si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element | null
      if (editingService && target && !target.closest('article')) {
        setEditingService(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [editingService])

  // Cargar los servicios externos al montar el componente
  useEffect(() => {
    const loadExternalServices = async () => {
      await getAllExternalServices()
    }
    loadExternalServices()
  }, [])

  const handleEdit = (service: ExternalService) => {
    setEditingService(service)
  }

  const onDelete = async (id: ObjectId) => {
    await deleteExternalService(id)
    // Filtra el servicio eliminado del estado local
    setExternalServices(externalServices.filter((service) => service.id !== id))
    setShowModal(false)
  }

  const handleUpdate = async () => {
    console.log(editingService)
    if (editingService) {
      await updateExternalService(editingService)
      setExternalServices(
        externalServices.map((service) =>
          service.id === editingService.id ? editingService : service
        )
      )
      setEditingService(null)
    }
  }

  return (
    <article className="p-6 bg-[#1c1c21] text-indigo-100">
      {externalServiceErrors.length > 0 && (
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
                  {externalServiceErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <table className="w-full bg-[#26262c] rounded-lg overflow-hidden">
        <thead className="bg-[#2f3037]">
          <tr>
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-left">Address</th>
            <th className="p-3 text-left">Place</th>
            <th className="p-3 text-left">Schedule</th>
            <th className="p-3 text-left">Website</th>
            <th className="p-3 text-left">Phone number</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {externalServices?.map((service) => (
            <ExternalServiceRow
              key={service.id.toString()}
              service={service}
              editingService={editingService}
              handleUpdate={handleUpdate}
              handleEdit={handleEdit}
              setShowModal={setShowModal}
              setEditingService={setEditingService}
              setExternalServiceToDelete={setExternalServiceToDelete}
              places={places}
            />
          ))}
        </tbody>
      </table>

      {showModal &&
        createPortal(
          <DeleteExternalServiceWarningModal
            onClose={() => setShowModal(false)}
            onDelete={onDelete}
            ExternalServiceId={externalServiceToDelete}
          />,
          document.body
        )}
    </article>
  )
}
