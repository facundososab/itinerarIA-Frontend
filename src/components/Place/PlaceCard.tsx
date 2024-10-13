import { usePlace } from "../../context/PlaceContext.tsx";
import { Card } from "../ui/Card.tsx";
import Place from "../../interfaces/Place.ts";
import { useState, useEffect } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { createPortal } from "react-dom";
import { PlaceForm } from "./PlaceForm.tsx";
import { ObjectId } from "@mikro-orm/mongodb";
import DeleteWarningModal from "../shared/DeleteWarningModal.tsx";
import { TrashIcon } from "@heroicons/react/24/outline";

export function PlaceCard({ place }: { place: Place }) {
  const { deletePlace, handleSelectPlace, setCurrentPlace } = usePlace();
  const [showModalForm, setShowModalForm] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [idPlaceToDelete, setIdPlaceToDelete] = useState<ObjectId | null>(null);

  const onDelete = (placeId: ObjectId) => {
    deletePlace(placeId);
    setShowModalDelete(false);
  };

  useEffect(() => {
    if (!showModalForm) {
      setCurrentPlace(null); //Para que al cerrar el form, se elimine el current itinerary, sino quedan los datos del place guardados en el form aunque no esta seleccionado.
    }
  }, [showModalForm]);

  return (
    <Card>
      <div onClick={() => handleSelectPlace(place.id)}>
        <header className="flex justify-between">
          <h1 className="text-2xl font-bold">{place.nombre}</h1>
          <div className="flex gap-x-2 items-center">
            <button
              onClick={(e) => {
                e.stopPropagation(); // Evita que el clic en el botón seleccione el itinerario(no se si es necesario aca)
                setShowModalDelete(true);
                setIdPlaceToDelete(place.id);
              }}
              className="p-1 border border-gray-600 rounded-md hover:bg-red-100"
            >
              <TrashIcon className="h-5 w-5 text-red-500" />
            </button>

            <button onClick={() => setShowModalForm(true)}>
              <PlusCircleIcon className="h-5 w-5 mr-2" />
              Edit
            </button>
          </div>
        </header>
        <p className="text-slate-300">{place.ubicacion_latitud}</p>
        <p className="text-slate-300">{place.ubicacion_longitud}</p>
        <p className="text-slate-300">{place.pais}</p>
        <p className="text-slate-300">{place.provincia}</p>
        <p className="text-slate-300">{place.codigoPostal}</p>
      </div>

      {showModalForm &&
        createPortal(
          <PlaceForm onClose={() => setShowModalForm(false)} />,
          document.body
        )}

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
    </Card>
  );
}
