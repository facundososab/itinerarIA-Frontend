import { useEffect } from "react";
import { useItinerary } from "../context/ItineraryContext.tsx";
import { NewItineraryButton } from "./NewItineraryButton.tsx";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../context/AuthContext.tsx";

export default function ItinerariesSidebar() {
  const {
    setItineraries,
    handleSelectItinerary,
    deleteItinerary,
    CurrentItinerary,
  } = useItinerary();
  const { itineraries } = useAuth();
  useEffect(() => {
    console.log(itineraries, "itineraries en useeffect");
    itineraries ? setItineraries(itineraries) : null;
  }, [itineraries]);
  const onDelete = () => {
    if (CurrentItinerary) {
      deleteItinerary(CurrentItinerary.id);
    }
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
            className="p-4 hover:bg-raisin-black-2 cursor-pointer"
            onClick={() => handleSelectItinerary(itinerary.id)}
          >
            <div className="font-medium">{itinerary.title}</div>
            <div className="text-sm text-gray-500 flex items-center">
              <CalendarIcon className="h-4 w-4 mr-2" />
              {itinerary.duration} days
            </div>
            <button type="submit" onClick={onDelete}>
              <span className=" text-red-500">Delete itinerary</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
