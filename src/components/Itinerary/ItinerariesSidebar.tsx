import { useEffect, useState } from "react";
import { useItinerary } from "../../context/ItineraryContext.tsx";
import { NewItineraryButton } from "./NewItineraryButton.tsx";
import { CalendarIcon, TrashIcon } from "@heroicons/react/24/outline";
import { createPortal } from "react-dom";
import DeleteWarningModal from "../DeleteWarningModal.tsx";
import { useAuth } from "../../context/AuthContext.tsx";
import { ObjectId } from "@mikro-orm/mongodb";
import { EditIcon } from "lucide-react";
import Itinerary from "../../interfaces/Itinerary.ts";
import UpdateItineraryModal from "./UpdateItineraryModal.tsx";
export default function ItinerariesSidebar() {
  const {
    setItineraries,
    handleSelectItinerary,
    deleteItinerary,
    updateItinerary,
  } = useItinerary();

  const { itineraries } = useAuth();

  useEffect(() => {
    console.log(itineraries, "itineraries en useeffect");
    itineraries ? setItineraries(itineraries) : null;
  }, [itineraries]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [itineraryToDelete, setItineraryToDelete] = useState<ObjectId | null>(
    null
  );
  const [itineraryToUpdate, setItineraryToUpdate] = useState<Itinerary | null>(
    null
  );

  const onDelete = (itineraryId: ObjectId) => {
    deleteItinerary(itineraryId);
    setShowDeleteModal(false);
  };

  const onUpdate = (itinerary: Itinerary) => {
    updateItinerary(itinerary);
    setShowUpdateModal(false);
  };

  return (
    <div className="w-64 bg-onyx h-screen flex flex-col">
      <div className="p-4">
        <NewItineraryButton />
      </div>
      <div className="overflow-y-auto flex-grow">
        {itineraries?.map((itinerary, i) => (
          <div
            key={i}
            className="p-4 hover:bg-raisin-black-2 cursor-pointer flex justify-between items-center"
            onClick={() => handleSelectItinerary(itinerary.id)}
          >
            <div>
              <div className="font-medium">{itinerary.title}</div>
              <div className="text-sm text-gray-500 flex items-center">
                <CalendarIcon className="h-4 w-4 mr-2" />
                {itinerary.duration} days
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Evita que el clic en el botón seleccione el itinerario
                setShowUpdateModal(true);
                setItineraryToUpdate(itinerary);
              }}
              className="p-1 my-3 border border-gray-600 rounded-md hover:bg-blue-100"
            >
              <EditIcon className="h-5 w-5 text-blue-500" />
            </button>
            {showUpdateModal &&
              createPortal(
                <UpdateItineraryModal
                  onClose={() => setShowUpdateModal(false)}
                  onUpdate={onUpdate}
                  id={itineraryToUpdate?.id}
                  text="Update itinerary"
                />,
                document.body
              )}

            <button
              onClick={(e) => {
                e.stopPropagation(); // Evita que el clic en el botón seleccione el itinerario
                setShowDeleteModal(true);
                setItineraryToDelete(itinerary.id);
              }}
              className="p-1 border border-gray-600 rounded-md hover:bg-red-100"
            >
              <TrashIcon className="h-5 w-5 text-red-500" />
            </button>
            {showDeleteModal &&
              createPortal(
                <DeleteWarningModal
                  onClose={() => setShowDeleteModal(false)}
                  onDelete={onDelete}
                  id={itineraryToDelete}
                  text="Are you sure you want to delete this itinerary?"
                />,
                document.body
              )}
          </div>
        ))}
      </div>
    </div>
  );
}
