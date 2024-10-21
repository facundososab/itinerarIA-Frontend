import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import Place from '../interfaces/Place.ts'
import {
  createPlaceRequest,
  deletePlaceRequest,
  getAllPlacesRequest,
  getPlaceRequest,
  updatePlaceRequest,
} from '../auth/place.ts'
import { ObjectId } from '@mikro-orm/mongodb'

export const PlacesContext = createContext({
  places: [] as Place[],
  setPlaces: (_places: Place[]) => { },
  place: null as Place | null,
  setPlace: (_place: Place) => { },
  currentPlace: null as Place | null,
  setCurrentPlace: (_currentPlace: Place) => { },
  getPlaces: () => { },
  getOnePlace: (_id: ObjectId) => { },
  createPlace: (_place: Place) => { },
  updatePlace: (_place: Place) => { },
  deletePlace: (_id: ObjectId) => { },
  placeErrors: [],
  setPlaceErrors: (_placeErrors: []) => { },
})

export const usePlace = () => {
  const context = useContext(PlacesContext)
  if (!context) {
    throw new Error(
      'usePlaces must be used within a PlacesProvider'
    )
  }
  return context
}

export function PlacesProvider({
  children,
}: {
  children: ReactNode
}) {
  const [places, setPlaces] = useState<Place[]>(
    []
  )

  const [place, setPlace] =
    useState<Place | null>(null)

  const [currentPlace, setCurrentPlace] =
    useState<Place | null>(null)

  const [placeErrors, setPlaceErrors] = useState<[]>([])

  const getPlaces = async () => {
    try {
      const res = await getAllPlacesRequest()
      setPlaces(res.data.data)
    } catch (err: any) {
      setPlaceErrors(err.response.data.message)
    }
  }

  const getOnePlace = async (id: ObjectId) => {
    try {
      const res = await getPlaceRequest(id)
      setPlace(res.data.data)
    } catch (err: any) {
      setPlaceErrors(err.response.data.message)
    }
  }

  const createPlace = async (place: Place) => {
    try {
      const res = await createPlaceRequest(place)
      setPlaces([...places, res.data.data])
    } catch (err: any) {
      setPlaceErrors(err.response.data.message)
    }
  }

  const updatePlace = async (place: Place) => {
    try {
      const res = await updatePlaceRequest(place)
      setPlaces([...places, res.data.data])
    } catch (err: any) {
      setPlaceErrors(err.response.data.message)
    }
  }

  const deletePlace = async (id: ObjectId) => {
    try {
      const res = await deletePlaceRequest(id)
      setPlace(res.data.data)
    } catch (err: any) {
      setPlaceErrors(err.response.data.message)
    }
  }

  //Elimino msj despues de 2 segundos
  useEffect(() => {
    if (placeErrors.length > 0) {
      const timer = setTimeout(() => {
        setPlaceErrors([])
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [placeErrors])

  return (
    <PlacesContext.Provider
      value={{
        places,
        setPlaces,
        getPlaces,
        place,
        setPlace,
        getOnePlace,
        createPlace,
        updatePlace,
        deletePlace,
        currentPlace,
        setCurrentPlace,
        placeErrors,
        setPlaceErrors,
      }}
    >
      {children}
    </PlacesContext.Provider>
  )
}
