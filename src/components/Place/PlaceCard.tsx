import { usePlace } from "../../context/PlaceContext.tsx";
import { Button } from "../ui/Button.tsx";
import { ButtonLink } from "../ui/ButtonLink.tsx";
import { Card } from "../ui/Card.tsx";
import Place from "../../interfaces/Place.ts";
import { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

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
                                <InputNewItinerary onClose={() => setShowModal(false)} />,
                                document.body
                            )}
                    </div>
                </header>
                <p className="text-slate-300">{place.ubicacion.latitud}</p>
                <p className="text-slate-300">{place.ubicacion.longitud}</p>
                <p className="text-slate-300">{place.pais}</p>
                <p className="text-slate-300">{place.provincia}</p>
                <p className="text-slate-300">{place.codigoPostal}</p>
            </div>

        </Card>
    );
}

export function NewItineraryButton() {
    return (
        <>
            <button
                className="w-full bg-blue-500 text-white rounded-md py-2 px-4 flex items-center justify-center hover:bg-blue-600 transition duration-200"
                onClick={() => setShowModal(true)}
            >
                <PlusCircleIcon className="h-5 w-5 mr-2" />
                New Itinerary
            </button>
            {showModal &&
                createPortal(
                    <InputNewItinerary onClose={() => setShowModal(false)} />,
                    document.body
                )}
        </>
    )
}