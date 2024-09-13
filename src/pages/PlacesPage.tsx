import { useEffect, useState } from "react";
import { usePlace } from "../context/PlaceContext";
import { PlusCircleIcon, PencilIcon, TrashIcon } from "lucide-react";
import { createPortal } from "react-dom";
import { PlaceForm } from "../components/Place/PlaceForm";
import { ObjectId } from "@mikro-orm/mongodb";
import DeleteWarningModal from "../components/DeleteWarningModal";

export function PlacesPage() {
  const { places, getPlaces, deletePlace, setCurrentPlace } = usePlace();
  const [showModalForm, setShowModalForm] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [idPlaceToDelete, setIdPlaceToDelete] = useState<ObjectId | null>(null)

  useEffect(() => {
    getPlaces();
  }, []);

  const onClose = () => {
    setShowModalForm(false);
  };

  const onDelete = (placeId: ObjectId) => {
    deletePlace(placeId)
    setShowModalDelete(false)
  }

  return (
    <article className="min-h-screen w-full bg-[#1c1c21] text-indigo-100 flex flex-col">
      <div className="flex-grow container mx-auto p-6 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">External Services</h1>
          <button
            onClick={() => setShowModalForm(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-indigo-700 transition-colors"
          >
            <PlusCircleIcon className="mr-2 h-5 w-5" />
            Add New Place
          </button>
        </div>

        {places?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <h2 className="text-4xl font-bold text-white mb-4">No places yet</h2>
            <p className="text-xl text-gray-400">Add a new place to get started</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-[#26262c] rounded-lg overflow-hidden">
              <thead className="bg-[#2f3037]">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Country</th>
                  <th className="p-3 text-left">Province</th>
                  <th className="p-3 text-left">Zip Code</th>
                  <th className="p-3 text-left">Geographic Location</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {places?.map((place, i) => (
                  <tr key={i} className="border-b border-[#393a41]">
                    <td className="p-3">{place.nombre}</td>
                    <td className="p-3">{place.pais || "N/A"}</td>
                    <td className="p-3">{place.provincia || "N/A"}</td>
                    <td className="p-3">{place.codigoPostal || "N/A"}</td>
                    <td className="p-3">{`${place.ubicacion_latitud}, ${place.ubicacion_longitud}`}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setShowModalForm(true);
                            setCurrentPlace(place);
                          }}
                          className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
                        >
                          <PencilIcon size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setShowModalDelete(true)
                            setIdPlaceToDelete(place.id)
                          }}
                          className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
                        >
                          <TrashIcon size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {showModalForm &&
          createPortal(<PlaceForm onClose={onClose} />, document.body)}

        {showModalDelete &&
          createPortal(
            <DeleteWarningModal
              onClose={() => setShowModalDelete(false)}
              onDelete={onDelete}
              id={idPlaceToDelete}
              text="Are you sure you want to delete this place?"
            />,
            document.body
          )}
      </div>
    </article>
  );
}