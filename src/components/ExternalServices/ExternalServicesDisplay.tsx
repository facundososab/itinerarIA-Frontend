import { useEffect, useState } from 'react'
import { useExternalServices } from '../../context/ExternalServicesContext'
import ExternalService from '../../interfaces/ExternalService'
import { ObjectId } from '@mikro-orm/mongodb'
import { createPortal } from 'react-dom'
//import DeleteExternalServiceWarningModal from './DeleteExternalServiceWarningModal.tsx'
import ExternalServiceRow from './ExternalServiceRow.tsx'
import { usePlace } from '../../context/PlaceContext.tsx'
import DeleteWarningModal from '../shared/DeleteWarningModal.tsx'

export function ExternalServicesDisplay() {
  const {
    externalServices,
    setExternalServices,
    getAllExternalServices,
    deleteExternalService,
    updateExternalService,
    externalServiceErrors,
  } = useExternalServices()

  const { places, getAllPlaces } = usePlace()

  useEffect(() => {
    const loadPlaces = async () => {
      getAllPlaces()
    }
    loadPlaces()
  }, [])

  const [editingService, setEditingService] = useState<ExternalService | null>(
    null
  )
  const [externalServiceToDelete, setExternalServiceToDelete] =
    useState<ObjectId | null>(null)
  const [showModal, setShowModal] = useState(false)

  // Close editing form if clicked outside of it
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

  // Load external services on component mount
  useEffect(() => {
    const loadExternalServices = async () => {
      getAllExternalServices()
    }
    loadExternalServices()
  }, [])

  const handleEdit = (service: ExternalService) => {
    setEditingService(service)
  }

  const onDelete = async (id: ObjectId) => {
    deleteExternalService(id)
    setExternalServices(externalServices.filter((service) => service.id !== id))
    setShowModal(false)
  }

  const handleUpdate = async () => {
    if (editingService) {
      updateExternalService(editingService)
      setEditingService(null)
    }
  }

  return (
    <article className="p-6 bg-[#1c1c21] text-indigo-100">
      {externalServiceErrors.length > 0 && (
        <div
          className="bg-red-900 border-l-4 border-red-500 p-4 mb-6"
          role="alert"
        >
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

      <div className="overflow-x-auto">
        <table className="min-w-full bg-[#26262c] rounded-lg overflow-hidden">
          <thead className="bg-[#2f3037]">
            <tr>
              <th className="p-3 text-left" scope="col">
                Type
              </th>
              <th className="p-3 text-left" scope="col">
                Name
              </th>
              <th className="p-3 text-left" scope="col">
                Description
              </th>
              <th className="p-3 text-left" scope="col">
                Address
              </th>
              <th className="p-3 text-left" scope="col">
                Place
              </th>
              <th className="p-3 text-left" scope="col">
                Schedule
              </th>
              <th className="p-3 text-left" scope="col">
                Website
              </th>
              <th className="p-3 text-left" scope="col">
                Phone number
              </th>
              <th className="p-3 text-left" scope="col">
                Actions
              </th>
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
      </div>

      {showModal &&
        createPortal(
          <DeleteWarningModal
            onClose={() => setShowModal(false)}
            onDelete={onDelete}
            id={externalServiceToDelete}
            text="Are you sure you want to delete this external service?"
          />,
          document.body
        )}
    </article>
  )
}
