import {
  createPlaceRequest,
  getPlacesRequest,
  getPlaceRequest,
  updatePlaceRequest,
  deletePlaceRequest,
} from "../auth/place.ts";
import { createContext, useContext, useState } from "react";
import Place from "../interfaces/Place.ts";
import { ObjectId } from "@mikro-orm/mongodb";
import { ReactNode } from "react";
import { useCallback } from "react";
import { useAuth } from "./AuthContext.tsx";

export const PlaceContext = createContext({
  places: null as Place[] | null,
  //setPlaces: (_places: Place[]) => {},
  createPlace: (_place: Place) => { },
  getPlaces: () => { },
  getPlace: (_id: ObjectId) => Promise<Place>,
  updatePlace: (_Place: Place) => { },
  deletePlace: (_id: ObjectId) => { },
  //CurrentPlace: null as Place | null,
  //handleNewPlace: (_Place: Place) => {},
  //handleSelectPlace: (_id: ObjectId) => {},
});

export const usePlace = () => {
  const context = useContext(PlaceContext);
  if (!context)
    throw new Error("usePlace must be used within a PlaceProvider");
  return context;
};

export function PlaceProvider({ children }: { children: ReactNode }) {
  const [places, setPlaces] = useState<Place[]>([]);
  const [CurrentPlace, setCurrentPlace] = useState<Place | null>(
    null
  );
  //tendria que validar que solo el admin pueda hacer esto. Tendria que traer el useAuth
  const createPlace = async (place: Place) => {
    try {
      const res = await createPlaceRequest(place);
      places.push(res.data.data);
      console.log(places);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePlace = async (id: ObjectId) => {
    try {
      const res = await deletePlaceRequest(id);
      if (res.status === 204) {
        setPlaces(places.filter((place) => place.id !== id));
        console.log("Place deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPlaces = async () => {
    const res = await getPlacesRequest();
    setPlaces(res.data);
  };

  const getPlace = async (id: ObjectId) => {
    const res = await getPlaceRequest(id);
    return res.data as Place;
    //setPlaces(res.data);
  };

  const updatePlace = async (place: Place) => {
    try {
      await updatePlaceRequest(place);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PlaceContext.Provider
      value={{
        places,
        //setPlaces,
        getPlaces,
        deletePlace,
        createPlace,
        getPlace,
        updatePlace,
        // CurrentPlace,
        // handleNewPlace,
        // handleSelectPlace,
      }}
    >
      {children}
    </PlaceContext.Provider>
  );



}   