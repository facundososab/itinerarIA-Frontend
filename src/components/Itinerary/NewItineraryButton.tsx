import { PlusCircleIcon } from "@heroicons/react/24/outline";
import InputNewItinerary from "./ItineraryForm.tsx";
import { createPortal } from "react-dom";
import { useState } from "react";
import { PlusIcon } from "lucide-react";

export function NewItineraryButton() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        className="group flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        onClick={() => setShowModal(true)}
      >
        <PlusIcon className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
        New Itinerary
      </button>
      {showModal &&
        createPortal(
          <InputNewItinerary onClose={() => setShowModal(false)} />,
          document.body
        )}
    </>
  );
}
