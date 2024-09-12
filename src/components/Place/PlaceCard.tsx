import { usePlace } from "../../context/PlaceContext.tsx";
import { Button } from "../ui/Button.tsx";
import { Card } from "../ui/Card.tsx";
import Place from "../../interfaces/Place.ts";
import { useEffect, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { createPortal } from "react-dom";
import { PlaceForm } from "./PlaceForm.tsx";

export function PlaceCard({ place }: { place: Place }) {
    const { deletePlace, handleSelectPlace, CurrentPlace, setCurrentPlace } = usePlace();
    const [showModal, setShowModal] = useState(false)

    const onClose = () => {
        setShowModal(false);
        //setCurrentPlace(null);
        //console.log(CurrentPlace, "este es el current place, deberia ser null");
    }

    useEffect(() => {
        if (!showModal) {
            setCurrentPlace(null); //Para que al cerrar el form, se elimine el current itinerary, sino quedan los datos del place guardados en el form aunque no esta seleccionado.
        }
    }, [showModal]);

    const onEdit = () => {
        setShowModal(true);
        handleSelectPlace(place.id);
        console.log(place, "este es el place seleccionado para editar")
    }

    return (
        <Card >
            <div>
                <header className="flex justify-between">
                    <h1 className="text-2xl font-bold">{place.nombre}</h1>
                    <div className="flex gap-x-2 items-center">
                        <Button onClick={() => deletePlace(place.id)}>Delete</Button>
                        <button onClick={onEdit}>
                            <PlusCircleIcon className="h-5 w-5 mr-2" />
                            Edit
                        </button>
                        {showModal &&
                            createPortal(
                                <PlaceForm onClose={onClose} />,
                                document.body
                            )}
                    </div>
                </header>
                <p className="text-slate-300">{place.pais}</p>
                <p className="text-slate-300">{place.provincia}</p>
                <p className="text-slate-300">{place.codigoPostal}</p>
                <p className="text-slate-300">{place.ubicacion_latitud}</p>
                <p className="text-slate-300">{place.ubicacion_longitud}</p>
            </div>

        </Card>
    );
}
