import {
  createPlaceRequest,
  getPlacesRequest,
  getPlaceRequest,
  updatePlaceRequest,
  deletePlaceRequest,
} from "../auth/place.ts";
import { createContext, useCallback, useContext, useState } from "react";
import Place from "../interfaces/Place.ts";
import { ObjectId } from "@mikro-orm/mongodb";
import { ReactNode } from "react";

export const PlaceContext = createContext({
  places: [] as Place[],
  setPlaces: (_places: Place[]) => {},
  createPlace: (_place: Place) => {},
  getPlaces: () => {},
  getPlace: async (_id: ObjectId) => {},
  updatePlace: (_Place: Place) => {},
  deletePlace: (_id: ObjectId) => {},
  CurrentPlace: null as Place | null,
  setCurrentPlace: (_Place: Place | null) => {},
  handleSelectPlace: (_id: ObjectId) => {},
});

export const usePlace = () => {
  const context = useContext(PlaceContext);
  if (!context) throw new Error("usePlace must be used within a PlaceProvider");
  return context;
};

export function PlaceProvider({ children }: { children: ReactNode }) {
  const [places, setPlaces] = useState<Place[]>([]);
  const [CurrentPlace, setCurrentPlace] = useState<Place | null>(null);

  const handleNewPlace = useCallback(
    (place: Place) => {
      setCurrentPlace(place);
    },
    [places]
  );

  const handleSelectPlace = (id: ObjectId) => {
    const selectedPlace = places.find((place) => place.id === id);
    console.log(selectedPlace, "lugar seleccionado");
    selectedPlace ? setCurrentPlace(selectedPlace) : null;
  };

  //tendria que validar que solo el admin pueda hacer esto. Tendria que traer el useAuth
  const createPlace = async (place: Place) => {
    try {
      const res = await createPlaceRequest(place);
      places.push(res.data.data);
      handleNewPlace(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePlace = async (id: ObjectId) => {
    try {
      const res = await deletePlaceRequest(id);
      if (res.status === 200) {
        setPlaces(places.filter((place) => place.id !== id));
        console.log("Place deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPlaces = async () => {
    const res = await getPlacesRequest();
    console.log(res.data.data, "places del back");
    setPlaces(res.data.data);
  };

  const getPlace = async (id: ObjectId) => {
    const res = await getPlaceRequest(id);
    setPlaces(res.data);
  };

  const updatePlace = async (place: Place) => {
    try {
      console.log(place.id, "el id   que le paso a updatePlace");
      console.log(place, "el lugar que le paso a updatePlace");
      const res = await updatePlaceRequest(place);
      const updatedPlace = res.data.data;
      setPlaces(
        (prevPlaces: Place[] | null) =>
          prevPlaces?.map((p) =>
            p.id === updatedPlace.id ? updatedPlace : p
          ) ?? []
      ); //actualiza el lugar en el array de lugares para el re-render
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PlaceContext.Provider
      value={{
        places,
        setPlaces,
        getPlaces,
        deletePlace,
        createPlace,
        getPlace,
        updatePlace,
        CurrentPlace,
        setCurrentPlace,
        // handleNewPlace,
        handleSelectPlace,
      }}
    >
      {children}
    </PlaceContext.Provider>
  );
}
