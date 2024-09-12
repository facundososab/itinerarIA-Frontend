import { usePlace } from "../../context/PlaceContext.tsx";
import { Button } from "../ui/Button.tsx";
import { Card } from "../ui/Card.tsx";
import Place from "../../interfaces/Place.ts";
import { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { createPortal } from "react-dom";
import { PlaceForm } from "./PlaceForm.tsx";

export function PlaceCard({ place }: { place: Place }) {
    const { deletePlace, handleSelectPlace } = usePlace();
    const [showModal, setShowModal] = useState(false)

    return (
        <Card >
            <div onClick={() => handleSelectPlace(place.id)}>
                <header className="flex justify-between">
                    <h1 className="text-2xl font-bold">{place.nombre}</h1>
                    <div className="flex gap-x-2 items-center">
                        <Button onClick={() => deletePlace(place.id)}>Delete</Button>
                        <button onClick={() => setShowModal(true)}>
                            <PlusCircleIcon className="h-5 w-5 mr-2" />
                            Edit
                        </button>
                        {showModal &&
                            createPortal(
                                <PlaceForm onClose={() => setShowModal(false)} />,
                                document.body
                            )}
                    </div>
                </header>
                <p className="text-slate-300">{place.ubicacion_latitud}</p>
                <p className="text-slate-300">{place.ubicacion_longitud}</p>
                <p className="text-slate-300">{place.pais}</p>
                <p className="text-slate-300">{place.provincia}</p>
                <p className="text-slate-300">{place.codigoPostal}</p>
            </div>

        </Card>
    );
}
