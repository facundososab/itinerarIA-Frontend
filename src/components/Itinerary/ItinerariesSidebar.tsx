import { useCallback, useEffect, useState } from "react";
import { useItinerary } from "../../context/ItineraryContext.tsx";
import { NewItineraryButton } from "./NewItineraryButton.tsx";
import { CalendarIcon, TrashIcon } from "@heroicons/react/24/outline";
import { createPortal } from "react-dom";
import DeleteWarningModal from "../shared/DeleteWarningModal.tsx";
import { ObjectId } from "@mikro-orm/mongodb";
import { Edit2 as EditIcon, MapPin, Filter } from "lucide-react";
import Itinerary from "../../interfaces/Itinerary.ts";
import UpdateItineraryModal from "./UpdateItineraryModal.tsx";
import { usePlace } from "../../context/PlaceContext.tsx";
import { useAuth } from "../../context/AuthContext.tsx";

export default function ItinerariesSidebar() {
  const {
    handleSelectItinerary,
    deleteItinerary,
    updateItinerary,
    // CurrentItinerary,
    itineraries,
    // setItineraries,
    getItineraries,
    itineraryErrors,
  } = useItinerary();
  const { places, getAllPlaces } = usePlace();
  const { user } = useAuth();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [itineraryToDelete, setItineraryToDelete] = useState<ObjectId | null>(
    null
  );
  const [itineraryToUpdate, setItineraryToUpdate] = useState<
    ObjectId | undefined
  >(undefined);
  const [selectedPlace, setSelectedPlace] = useState<string>("");
  const [filteredItineraries, setFilteredItineraries] = useState<
    Itinerary[] | null
  >(itineraries);

  // const loadPlaces = useCallback(async () => {
  //   await getAllPlaces();
  // }, [getAllPlaces, itineraries]);

  const loadItineraries = useCallback(async () => {
    if (user) await getItineraries(user?.id);
  }, [getItineraries, itineraries, user]);

  useEffect(() => {
    const loadData = async () => {
      await getAllPlaces();
      if (user) await getItineraries(user?.id);
    };
    loadData();
  }, []);

  useEffect(() => {
    // itineraries ? setItineraries(itineraries) : null;
    if (itineraries) {
      setFilteredItineraries(
        selectedPlace
          ? itineraries.filter(
              (itinerary) =>
                itinerary.place?.id.toString() === selectedPlace.toString()
            )
          : itineraries
      );
    }
  }, [itineraries, selectedPlace]);

  const onDelete = (itineraryId: ObjectId) => {
    deleteItinerary(itineraryId);
    setShowDeleteModal(false);
  };

  const onUpdate = (data: Itinerary) => {
    console.log(data);
    updateItinerary(data);
    setShowUpdateModal(false);
    loadItineraries();
  };

  return (
    <div className="w-full sm:w-64 md:w-72 lg:w-80 bg-onyx h-screen flex flex-col">
      <div className="p-4 space-y-4">
        <NewItineraryButton />
        <div className="relative">
          <select
            value={selectedPlace}
            onChange={(e) => setSelectedPlace(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#1c1c21] border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">All Places</option>
            {places?.map((place) => (
              <option key={place.id.toString()} value={place.id.toString()}>
                {place.name}
              </option>
            ))}
          </select>
          <Filter
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={16}
          />
        </div>
      </div>
      {itineraryErrors && itineraryErrors?.length > 0 && (
        <div
          className="bg-red-50 border-l-4 border-red-400 p-4 mb-6"
          role="alert"
          aria-live="assertive"
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                There were some errors with your itinerary
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <ul className="list-disc pl-5 space-y-1">
                  {itineraryErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="overflow-y-auto flex-grow">
        {filteredItineraries?.length === 0 && (
          <div className="p-4 text-gray-500 text-center">
            No itineraries found for this place
          </div>
        )}
        {filteredItineraries?.map((itinerary, i) => (
          <div
            key={i}
            className="p-4 hover:bg-raisin-black-2 cursor-pointer flex justify-between items-center"
            onClick={() => handleSelectItinerary(itinerary.id)}
          >
            <div>
              <div className="font-medium text-indigo-300">
                {itinerary.title}
              </div>
              <div className="text-sm text-gray-500 flex items-center">
                <CalendarIcon className="h-4 w-4 mr-2" />
                {(
                  Math.abs(
                    new Date(itinerary.dayEnd).getTime() -
                      new Date(itinerary.dayStart).getTime()
                  ) /
                  (1000 * 60 * 60 * 24)
                ).toFixed(0)}{" "}
                {"days"}
              </div>
              <div className="text-sm text-gray-500 flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                {itinerary.place.name}
                {" - "}
                {itinerary.place.country}
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowUpdateModal(true);
                  setItineraryToUpdate(itinerary.id);
                }}
                className="p-1.5 rounded-full bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200 group"
              >
                <EditIcon className="h-4 w-4 text-white group-hover:scale-110 transition-transform duration-200" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeleteModal(true);
                  setItineraryToDelete(itinerary.id);
                }}
                className="p-1.5 rounded-full bg-red-600 hover:bg-red-700 transition-colors duration-200 group"
              >
                <TrashIcon className="h-4 w-4 text-white group-hover:scale-110 transition-transform duration-200" />
              </button>
            </div>
          </div>
        ))}
      </div>
      {showUpdateModal &&
        createPortal(
          <UpdateItineraryModal
            onClose={() => setShowUpdateModal(false)}
            onUpdate={onUpdate}
            id={itineraryToUpdate}
            text="Update itinerary"
            places={places}
          />,
          document.body
        )}
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
  );
}
