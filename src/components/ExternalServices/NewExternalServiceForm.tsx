import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useExternalServices } from '../../context/ExternalServicesContext.tsx'
import ExternalService from '../../interfaces/ExternalService.ts'
import { X } from 'lucide-react'
import { usePlace } from '../../context/PlaceContext.tsx'

export default function NewExternalServiceForm({
  onClose,
}: {
  onClose: () => void
}) {
  const { createExternalService, externalServiceErrors } = useExternalServices()
  const { places, getPlaces } = usePlace()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExternalService>()

  useEffect(() => {
    const loadPlaces = async () => {
      getPlaces()
    }
    loadPlaces()
  }, [])

  const onCreate = handleSubmit(async (data) => {
    createExternalService(data)
    onClose()
  })

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#131316] bg-opacity-75 z-50">
      <div className="bg-[#1c1c21] p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-indigo-300 hover:text-indigo-100 transition-colors duration-200"
          aria-label="Close"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold text-indigo-100 mb-4">
          New External Service
        </h2>
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

        <form onSubmit={onCreate} className="space-y-4">
          <div>
            <label
              htmlFor="tipoServicio"
              className="block text-sm font-medium text-indigo-300"
            >
              Service Type
            </label>
            <input
              id="tipoServicio"
              type="text"
              {...register('tipoServicio', {
                minLength: {
                  value: 3,
                  message: 'Service type must be at least 3 characters long',
                },
                maxLength: {
                  value: 20,
                  message: 'Service type must be at most 20 characters long',
                },
                required: 'Service type is required',
              })}
              className="mt-1 block w-full px-3 py-2 bg-[#26262c] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter service type"
            />
            {errors.tipoServicio?.message && (
              <p className="mt-1 text-sm text-red-400">
                {errors.tipoServicio.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-indigo-300"
            >
              Name
            </label>
            <input
              id="nombre"
              type="text"
              {...register('nombre', {
                minLength: {
                  value: 3,
                  message: 'Name must be at least 3 characters long',
                },
                maxLength: {
                  value: 40,
                  message: 'Name must be at most 40 characters long',
                },
                required: 'Name is required',
              })}
              className="mt-1 block w-full px-3 py-2 bg-[#26262c] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter service name"
            />
            {errors.nombre?.message && (
              <p className="mt-1 text-sm text-red-400">
                {errors.nombre.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="descripcion"
              className="block text-sm font-medium text-indigo-300"
            >
              Description
            </label>
            <input
              id="descripcion"
              type="text"
              {...register('descripcion', {
                minLength: {
                  value: 10,
                  message: 'Description must be at least 10 characters long',
                },
                maxLength: {
                  value: 100,
                  message: 'Description must be at most 100 characters long',
                },
                required: 'Description is required',
              })}
              className="mt-1 block w-full px-3 py-2 bg-[#26262c] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter external service description"
            />
            {errors.descripcion?.message && (
              <p className="mt-1 text-sm text-red-400">
                {errors.descripcion.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="direccion"
              className="block text-sm font-medium text-indigo-300"
            >
              Address
            </label>
            <input
              id="direccion"
              type="text"
              {...register('direccion', {
                minLength: {
                  value: 10,
                  message: 'Address must be at least 10 characters long',
                },
                maxLength: {
                  value: 40,
                  message: 'Address must be at most 40 characters long',
                },
                required: 'Address is required',
              })}
              className="mt-1 block w-full px-3 py-2 bg-[#26262c] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter external service address"
            />
            {errors.direccion?.message && (
              <p className="mt-1 text-sm text-red-400">
                {errors.direccion.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="lugar"
              className="block text-sm font-medium text-indigo-300"
            >
              Place
            </label>
            <select
              id="lugar"
              {...register('lugar', {
                required: 'Place is required',
              })}
              className="mt-1 block w-full px-3 py-2 bg-[#26262c] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select a place</option>
              {places &&
                places.map((place) => (
                  <option key={place.id.toString()} value={place.id.toString()}>
                    {place.nombre}
                  </option>
                ))}
            </select>
            {errors.lugar?.message && (
              <p className="mt-1 text-sm text-red-400">
                {errors.lugar.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="horario"
              className="block text-sm font-medium text-indigo-300"
            >
              Schedule
            </label>
            <input
              id="horario"
              type="text"
              {...register('horario', {
                minLength: {
                  value: 3,
                  message: 'Schedule must be at least 3 characters long',
                },
                maxLength: {
                  value: 40,
                  message: 'Schedule must be at most 40 characters long',
                },
                required: 'Schedule is required',
              })}
              className="mt-1 block w-full px-3 py-2 bg-[#26262c] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter external service schedule"
            />
            {errors.horario?.message && (
              <p className="mt-1 text-sm text-red-400">
                {errors.horario.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="sitioWeb"
              className="block text-sm font-medium text-indigo-300"
            >
              Website
            </label>
            <input
              id="sitioWeb"
              type="text"
              {...register('sitioWeb', {
                minLength: {
                  value: 3,
                  message: 'Website must be at least 3 characters long',
                },
                maxLength: {
                  value: 50,
                  message: 'Website must be at most 50 characters long',
                },
                pattern: {
                  value: /^www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
                  message: 'Website must be a valid URL (www.example.com)',
                },
              })}
              className="mt-1 block w-full px-3 py-2 bg-[#26262c] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter external service website"
            />
            {errors.sitioWeb?.message && (
              <p className="mt-1 text-sm text-red-400">
                {errors.sitioWeb.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="telContacto"
              className="block text-sm font-medium text-indigo-300"
            >
              Phone number
            </label>
            <input
              id="telContacto"
              type="number"
              {...register('telContacto', {
                minLength: {
                  value: 10,
                  message: 'Website must be 10 characters long',
                },
                maxLength: {
                  value: 10,
                  message: 'Website must be 10 characters long',
                },
              })}
              className="mt-1 block w-full px-3 py-2 bg-[#26262c] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter external service website"
            />
            {errors.telContacto?.message && (
              <p className="mt-1 text-sm text-red-400">
                {errors.telContacto.message}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Create External Service
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
