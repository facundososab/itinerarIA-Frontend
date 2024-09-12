import { useEffect } from "react";
import { usePlace } from "../context/PlaceContext.tsx";
import { PlaceCard } from "../components/Place/PlaceCard.tsx";
import { ImFileEmpty } from "react-icons/im";
import { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { createPortal } from "react-dom";
import { PlaceForm } from "../components/Place/PlaceForm.tsx";

export function PlacesPage() {
  const { places, getPlaces, setPlaces } = usePlace();

  useEffect(() => {
    console.log(places, "places actualizados");
  }, [places]);

  useEffect(() => {
    getPlaces();
    console.log(places, "places cada vez que se renderiza")
  }, []);

  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <>
        <button
          className=" bg-blue-500 text-white rounded-md py-2 px-4 flex items-center justify-center hover:bg-blue-600 transition duration-200"
          onClick={() => setShowModal(true)}
        >
          <PlusCircleIcon className="h-5 w-5 mr-2" />
          New Place
        </button>
        {showModal &&
          createPortal(
            <PlaceForm onClose={() => setShowModal(false)} />,
            document.body
          )}
      </>

      <div className="flex h-full bg-raisin-black-2">
        <div className="flex-1 flex flex-col">

          {places?.length === 0 ? (
            <p>No places yet, add a new place</p>
          ) : (

            places?.map((place, i) => (
              <PlaceCard place={place} key={i} />

            ))
          )}

        </div>
      </div>
    </>
  );
}
