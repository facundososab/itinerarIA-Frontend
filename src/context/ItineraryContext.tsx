import {
  createItineraryRequest,
  getItineraryRequest,
  updateItineraryRequest,
  deleteItineraryRequest,
  getItinerariesByUserRequest,
} from "../auth/itinerary.ts";
import { createContext, useContext, useState } from "react";
import Itinerary from "../interfaces/Itinerary.ts"; // Import the Itinerary type correctly
import { ObjectId } from "@mikro-orm/mongodb";
import { ReactNode } from "react";
import { useCallback } from "react";
import { useAuth } from "./AuthContext.tsx";

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
  const { user, itineraries, setItineraries } = useAuth();
  const [CurrentItinerary, setCurrentItinerary] = useState<Itinerary | null>(
    null
  );
  //creo handler para que cuando se cree un nuevo itinerario se seleccione automaticamente
  const handleNewItinerary = useCallback(
    (itinerary: Itinerary) => {
      setCurrentItinerary(itinerary);
      console.log("entra al handleNewItinerary");
    },
    [itineraries]
  );

  const handleDeleteItinerary = useCallback(
    () => setCurrentItinerary(null),
    [itineraries]
  );

  const handleUpdateItinerary = useCallback(
    (itinerary: Itinerary) => {
      console.log("entra al handleUpdateItinerary");
      setCurrentItinerary(itinerary);
    },
    [itineraries]
  );

  const handleSelectItinerary = (id: ObjectId) => {
    console.log(id, itineraries, "itinerario seleccionado");

    const selectedItinerary = itineraries?.find(
      (itinerary) => itinerary.id === id
    );
    console.log(selectedItinerary);
    selectedItinerary ? setCurrentItinerary(selectedItinerary) : null;
  };

  const createItinerary = async (itinerary: Itinerary) => {
    try {
      console.log(itinerary);
      itinerary.user = user ? user.id : null;
      const res = await createItineraryRequest(itinerary);
      itineraries?.push(res.data.data);
      handleNewItinerary(res.data.data);
      if (itinerary.user) await getItineraries(itinerary.user);
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
        itineraries
          ? setItineraries(
              itineraries.filter((itinerary) => itinerary.id !== id)
            )
          : null;
        handleDeleteItinerary();
        console.log("itinerary deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getItineraries = async (userId: ObjectId) => {
    const res = await getItinerariesByUserRequest(userId);
    setItineraries(res.data.data);
  };

  const getItinerary = async (id: ObjectId) => {
    const res = await getItineraryRequest(id);
    setItineraries(res.data.data);
  };

  const updateItinerary = async (itinerary: Itinerary) => {
    try {
      const res = await updateItineraryRequest(itinerary);
      const itineraryUpdated: Itinerary = res.data.data;
      const newItineraries = itineraries?.map((itinerary) =>
        itinerary.id === itineraryUpdated.id ? itineraryUpdated : itinerary
      );
      itineraries ? setItineraries(newItineraries as Itinerary[]) : null;
      handleUpdateItinerary(itineraryUpdated);
      if (itinerary.user) await getItineraries(itinerary.user);
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
