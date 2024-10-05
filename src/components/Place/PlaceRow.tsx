import { PencilIcon, TrashIcon } from 'lucide-react'
import Place from '../../interfaces/Place.ts'
import { ObjectId } from '@mikro-orm/mongodb'

export default function PlaceRow({
    place,
    editingPlace,
    setEditingPlace,
    handleUpdate,
    handleEdit,
    setShowModal,
    setPlaceToDelete,
    places,
}: {
    place: Place
    places: Place[] | []
    editingPlace: Place | null
    setEditingPlace: (place: Place | null) => void
    handleUpdate: () => void
    handleEdit: (place: Place) => void
    setShowModal: (show: boolean) => void
    setPlaceToDelete: (id: ObjectId) => void
}) {
    return (
        <tr key={place.id.toString()} className="border-b border-[#393a41]">
            <td className="p-3">
                {editingPlace?.id === place.id ? (
                    <input
                        type="text"
                        value={editingPlace.nombre}
                        onChange={(e) =>
                            setEditingPlace({
                                ...editingPlace,
                                nombre: e.target.value,
                            })
                        }
                        className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
                    />
                ) : (
                    place.nombre
                )}
            </td>
            <td className="p-3">
                {editingPlace?.id === place.id ? (
                    <input
                        type="number"
                        step="any"
                        value={editingPlace.ubicacion_latitud}
                        onChange={(e) =>
                            setEditingPlace({
                                ...editingPlace,
                                ubicacion_latitud: parseFloat(e.target.value),
                            })
                        }
                        className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
                    />
                ) : (
                    place.ubicacion_latitud
                )}
            </td>
            <td className="p-3">
                {editingPlace?.id === place.id ? (
                    <input
                        type="number"
                        step="any"
                        value={editingPlace.ubicacion_longitud}
                        onChange={(e) =>
                            setEditingPlace({
                                ...editingPlace,
                                ubicacion_longitud: parseFloat(e.target.value),
                            })
                        }
                        className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
                    />
                ) : (
                    place.ubicacion_longitud
                )}
            </td>
            <td className="p-3">
                {editingPlace?.id === place.id ? (
                    <input
                        type="string"
                        value={editingPlace.codigoPostal}
                        onChange={(e) =>
                            setEditingPlace({
                                ...editingPlace,
                                codigoPostal: e.target.value,
                            })
                        }
                        className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
                    />
                ) : (
                    place.codigoPostal
                )}
            </td>
            <td className="p-3">
                {editingPlace?.id === place.id ? (
                    <input
                        type="string"
                        value={editingPlace.provincia}
                        onChange={(e) =>
                            setEditingPlace({
                                ...editingPlace,
                                provincia: e.target.value,
                            })
                        }
                        className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
                    />
                ) : (
                    place.provincia
                )}
            </td>
            <td className="p-3">
                {editingPlace?.id === place.id ? (
                    <input
                        type="string"
                        value={editingPlace.pais}
                        onChange={(e) =>
                            setEditingPlace({
                                ...editingPlace,
                                pais: e.target.value,
                            })
                        }
                        className="bg-[#2f3037] text-indigo-100 p-1 rounded w-full"
                    />
                ) : (
                    place.pais
                )}
            </td>

            <td className="p-3">
                {editingPlace?.id === place.id ? (
                    <div className="flex gap-2">
                        <button
                            onClick={handleUpdate}
                            className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setEditingPlace(null)}
                            className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleEdit(place)}
                            className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
                        >
                            <PencilIcon size={16} />
                        </button>
                        <button
                            onClick={() => {
                                setShowModal(true)
                                setPlaceToDelete(place.id)
                            }}
                            className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
                        >
                            <TrashIcon size={16} />
                        </button>
                    </div>
                )}
            </td>
        </tr>
    )
}
