import { useEffect, useState } from 'react'
import { usePlace } from '../../context/PlaceContext.tsx'
import Place from '../../interfaces/Place.ts'
import { ObjectId } from '@mikro-orm/mongodb'
import { createPortal } from 'react-dom'
//import DeletePlaceWarningModal from './DeletePlaceWarningModal.tsx'
import PlaceRow from './PlaceRow.tsx'
import DeleteWarningModal from '../shared/DeleteWarningModal.tsx'

export function PlacesDisplay() {
    const {
        places,
        setPlaces,
        getPlaces,
        deletePlace,
        updatePlace,
        placeErrors,
    } = usePlace()


    useEffect(() => {
        const loadPlaces = async () => {
            await getPlaces()
        }
        loadPlaces()
    }, [])

    const [editingPlace, setEditingPlace] = useState<Place | null>(
        null
    )

    const [placeToDelete, setPlaceToDelete] =
        useState<ObjectId | null>(null)

    const [showModal, setShowModal] = useState(false)

    // Cerrar el formulario de edición si se hace clic fuera de él
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element | null
            if (editingPlace && target && !target.closest('article')) {
                setEditingPlace(null)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [editingPlace])

    // Cargar los lugares al montar el componente
    useEffect(() => {
        const loadPlaces = async () => {
            await getPlaces()
        }
        loadPlaces()
    }, [])

    const handleEdit = (place: Place) => {
        setEditingPlace(place)
    }

    const onDelete = async (id: ObjectId) => {
        await deletePlace(id)
        // Filtra el lugar eliminado del estado local
        setPlaces(places.filter((place) => place.id !== id))
        setShowModal(false)
    }

    const handleUpdate = async () => {
        if (editingPlace) {
            await updatePlace(editingPlace)
            setPlaces(
                places.map((place) =>
                    place.id === editingPlace.id ? editingPlace : place
                )
            )
            setEditingPlace(null)
        }
    }

    return (
        <article className="p-6 bg-[#1c1c21] text-indigo-100">
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

            <table className="w-full bg-[#26262c] rounded-lg overflow-hidden">
                <thead className="bg-[#2f3037]">
                    <tr>
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Latitude</th>
                        <th className="p-3 text-left">Longitude</th>
                        <th className="p-3 text-left">Zip code</th>
                        <th className="p-3 text-left">Province / State</th>
                        <th className="p-3 text-left">Country</th>
                        <th className="p-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {places?.map((place) => (
                        <PlaceRow
                            key={place.id.toString()}
                            place={place}
                            editingPlace={editingPlace}
                            handleUpdate={handleUpdate}
                            handleEdit={handleEdit}
                            setShowModal={setShowModal}
                            setEditingPlace={setEditingPlace}
                            setPlaceToDelete={setPlaceToDelete}
                            places={places}
                        />
                    ))}
                </tbody>
            </table>

            {showModal &&
                createPortal(
                    <DeleteWarningModal
                        onClose={() => setShowModal(false)}
                        onDelete={onDelete}
                        id={placeToDelete}
                        text="Are you sure you want to delete this place?"
                    />,
                    document.body
                )}
        </article>
    )
}
