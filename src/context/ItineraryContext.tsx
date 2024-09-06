import {
  createItineraryRequest,
  getItinerariesRequest,
  getItineraryRequest,
  updateItineraryRequest,
  deleteItineraryRequest,
} from "../auth/itinerario";
import { createContext, useContext, useState } from "react";
import Itinerary from "../interfaces/Itinerary.ts"; // Import the Itinerary type correctly
import { ObjectId } from "@mikro-orm/mongodb";
import { ReactNode } from "react";
import { useCallback } from "react";
import { useAuth } from "./AuthContext.tsx";

// const generateMockItinerary = (title: string): ItineraryDay[] => [
//   {
//     day: 1,
//     activities: [
//       `Check-in to hotel in ${title}`,
//       'Visit local landmarks',
//       'Dinner at a popular restaurant',
//     ],
//   },
//   {
//     day: 2,
//     activities: [
//       'Morning city tour',
//       'Afternoon museum visit',
//       'Evening cultural show',
//     ],
//   },
// ]

export const ItineraryContext = createContext({
  itineraries: null as Itinerary[] | null,
  setItineraries: (_itineraries: Itinerary[]) => {},
  createItinerary: (_itinerary: Itinerary) => {},
  getItineraries: (_userId: ObjectId) => {},
  getItinerary: (_id: ObjectId) => {},
  updateItinerary: (_itinerary: Itinerary) => {},
  deleteItinerary: (_id: ObjectId) => {},
  CurrentItinerary: null as Itinerary | null,
  handleNewItinerary: (_itinerary: Itinerary) => {},
  handleSelectItinerary: (_id: ObjectId) => {},
});

export const useItinerary = () => {
  const context = useContext(ItineraryContext);
  if (!context)
    throw new Error("useItinerary must be used within a ItineraryProvider");
  return context;
};

export function ItineraryProvider({ children }: { children: ReactNode }) {
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [CurrentItinerary, setCurrentItinerary] = useState<Itinerary | null>(
    null
  );
  const { user } = useAuth();
  //creo handler para que cuando se cree un nuevo itinerario se seleccione automaticamente
  const handleNewItinerary = useCallback(
    (itinerary: Itinerary) => {
      setCurrentItinerary(itinerary);
    },
    [itineraries]
  );
  const handleDeleteItinerary = useCallback(
    () => setCurrentItinerary(null),
    [itineraries]
  );

  const handleSelectItinerary = (id: ObjectId) => {
    console.log(id, itineraries);
    const selectedItinerary = itineraries.find(
      (itinerary) => itinerary.id === id
    );
    console.log(selectedItinerary);
    selectedItinerary ? setCurrentItinerary(selectedItinerary) : null;
  };

  const createItinerary = async (itinerary: Itinerary) => {
    try {
      itinerary.user = user ? user.id : null;
      const res = await createItineraryRequest(itinerary);
      itineraries.push(res.data.data);
      handleNewItinerary(res.data.data);
      console.log(itineraries);

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItinerary = async (id: ObjectId) => {
    try {
      const res = await deleteItineraryRequest(id);
      if (res.status === 204) {
        setItineraries(itineraries.filter((itinerary) => itinerary.id !== id));
        handleDeleteItinerary();
        console.log("itinerary deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getItineraries = async (userId: ObjectId) => {
    const res = await getItinerariesRequest(userId);
    setItineraries(res.data);
  };

  const getItinerary = async (id: ObjectId) => {
    const res = await getItineraryRequest(id);
    setItineraries(res.data);
  };

  const updateItinerary = async (itinerary: Itinerary) => {
    try {
      await updateItineraryRequest(itinerary);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ItineraryContext.Provider
      value={{
        itineraries,
        setItineraries,
        getItineraries,
        deleteItinerary,
        createItinerary,
        getItinerary,
        updateItinerary,
        CurrentItinerary,
        handleNewItinerary,
        handleSelectItinerary,
      }}
    >
      {children}
    </ItineraryContext.Provider>
  );
}
