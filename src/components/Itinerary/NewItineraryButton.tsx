import ItineraryForm from "./ItineraryForm";
import { createPortal } from "react-dom";
import { useState } from "react";
import { PlusIcon } from "lucide-react";

export function NewItineraryButton() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        className="group w-full bg-blue-500 text-white rounded-md py-2 px-4 flex items-center justify-center hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        onClick={() => setShowModal(true)}
      >
        <PlusIcon className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
        New Itinerary
      </button>
      {showModal &&
        createPortal(
          <ItineraryForm onClose={() => setShowModal(false)} />,
          document.body
        )}
    </>
  );
}
