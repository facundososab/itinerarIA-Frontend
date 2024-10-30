import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { usePlace } from '../../context/PlaceContext.tsx'
import Place from '../../interfaces/Place.ts'
import { X } from 'lucide-react'

export default function NewPlaceForm({
    onClose,
}: {
    onClose: () => void
}) {
    const { createPlace, placeErrors } = usePlace()
    const { places, getAllPlaces } = usePlace()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Place>()

    useEffect(() => {
        const loadPlaces = async () => {
            getAllPlaces()
        }
        loadPlaces()
    }, [])

    const onCreate = handleSubmit(async (data) => {
        createPlace(data)
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
                    New Place
                </h2>
                {placeErrors.length > 0 && (
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
                                        {placeErrors.map((error, index) => (
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
                            htmlFor="nombre"
                            className="block text-sm font-medium text-indigo-300"
                        >
                            Name
                        </label>
                        <input
                            id="nombre"
                            type="text"
                            {...register('nombre', {
                                pattern: {
                                    value: /^[a-zA-Z0-9\s]{3,50}$/,
                                    message: 'Invalid name format (between 3 and 50 characters. Alphanumeric only)',
                                },
                                required: 'Name is required',
                            })}
                            className="mt-1 block w-full px-3 py-2 bg-[#26262c] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter the place's name"
                        />
                        {errors.nombre?.message && (
                            <p className="mt-1 text-sm text-red-400">
                                {errors.nombre.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="ubicacion_latitud"
                            className="block text-sm font-medium text-indigo-300"
                        >
                            Latitude
                        </label>
                        <input
                            id="ubicacion_latitud"
                            type="number"
                            step="any" // Permite números decimales
                            {...register('ubicacion_latitud', {
                                pattern: {
                                    value: /^-?([1-8]?[0-9]\.\d{6}|90\.000000)$/,
                                    message:
                                        'Invalid latitude format (between -90 and 90 with six decimals)',
                                },
                                required: "latitude is required",
                            })}
                            className="mt-1 block w-full px-3 py-2 bg-[#26262c] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter place's latitude"
                        />
                        {errors.ubicacion_latitud?.message && (
                            <p className="mt-1 text-sm text-red-400">
                                {errors.ubicacion_latitud.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="ubicacion_longitud"
                            className="block text-sm font-medium text-indigo-300"
                        >
                            Longitude
                        </label>
                        <input
                            id="ubicacion_longitud"
                            type="number"
                            step="any" // Permite números decimales
                            {...register('ubicacion_longitud', {
                                pattern: {
                                    value: /^-?(1[0-7][0-9]|0?[0-9]{1,2})\.\d{6}$|^-?180\.000000$/,
                                    message:
                                        'Invalid longitude format (between -180 and 180 with six decimals)',
                                },
                                required: "Longitude is required",
                            })}
                            className="mt-1 block w-full px-3 py-2 bg-[#26262c] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter places's longitude"
                        />
                        {errors.ubicacion_longitud?.message && (
                            <p className="mt-1 text-sm text-red-400">
                                {errors.ubicacion_longitud.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="codigoPostal"
                            className="block text-sm font-medium text-indigo-300"
                        >
                            ZIP Code
                        </label>
                        <input
                            id="codigoPostal"
                            type="text"
                            {...register('codigoPostal', {
                                pattern: {
                                    value: /^[A-Za-z0-9-]{4,10}$/,
                                    message:
                                        'Invalid zip code format (between 4 and 10 characters. Alphanumeric and "-" only)',
                                },
                                required: "zip Code is required",
                            })}
                            className="mt-1 block w-full px-3 py-2 bg-[#26262c] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter place's ZIP code"
                        />
                        {errors.codigoPostal?.message && (
                            <p className="mt-1 text-sm text-red-400">
                                {errors.codigoPostal.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="provincia"
                            className="block text-sm font-medium text-indigo-300"
                        >
                            Province
                        </label>
                        <input
                            id="provincia"
                            type="text"
                            {...register('provincia', {
                                pattern: {
                                    value: /^[a-zA-Z\s]{3,50}$/,
                                    message:
                                        'Invalid province format (between 3 and 50 characters. Letters only)',
                                },
                                required: 'Province is required',
                            })}
                            className="mt-1 block w-full px-3 py-2 bg-[#26262c] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter place's province"
                        />
                        {errors.provincia?.message && (
                            <p className="mt-1 text-sm text-red-400">
                                {errors.provincia.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="pais"
                            className="block text-sm font-medium text-indigo-300"
                        >
                            Country
                        </label>
                        <input
                            id="pais"
                            type="text"
                            {...register('pais', {
                                pattern: {
                                    value: /^[a-zA-Z\s]{3,50}$/,
                                    message:
                                        'Invalid country format (between 3 and 50 characters. Letters only)',
                                },
                                required: 'Country is required',
                            })}
                            className="mt-1 block w-full px-3 py-2 bg-[#26262c] border border-[#393a41] rounded-md text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter places's Country"
                        />
                        {errors.pais?.message && (
                            <p className="mt-1 text-sm text-red-400">
                                {errors.pais.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                        >
                            Create Place
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
