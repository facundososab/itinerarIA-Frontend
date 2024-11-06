import { useEffect } from "react";
import ItinerariesSidebar from "../components/Itinerary/ItinerariesSidebar.tsx";
import { ItineraryDisplay } from "../components/Itinerary/ItineraryDisplay.tsx";
import {
  //ItineraryProvider,
  useItinerary,
} from "../context/ItineraryContext.tsx";
import { useAuth } from "../context/AuthContext.tsx";
import Loader from "../components/ui/Loader.tsx";

export default function ItinerariesPage() {
  const { user } = useAuth();
  const { CurrentItinerary, getItineraries, isLoaded, setCurrentItinerary } =
    useItinerary();

  useEffect(() => {
    const loadItineraries = async () => {
      if (user) {
        getItineraries(user.id);
      }
    };
    loadItineraries();
  }, []);

  return (
    <div className="flex h-full bg-raisin-black-2">
      <ItinerariesSidebar />
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto">
          {!CurrentItinerary && isLoaded ? (
            <div className="h-full flex items-center justify-center text-gray-500">
              No itineraries found. Select an itinerary or create a new one.
            </div>
          ) : !isLoaded ? (
            <>
              <Loader />
              <p className="text-gray-500 text-center">
                Generating itinerary...
              </p>
            </>
          ) : (
            <ItineraryDisplay />
          )}
        </div>
      </div>
    </div>
  );
}
