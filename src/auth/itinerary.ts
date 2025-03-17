import instance from "./axios.ts";
import Itinerary from "../interfaces/Itinerary";
import { ObjectId } from "@mikro-orm/mongodb";

export const createItineraryRequest = (itinerary: Itinerary) => {
  return instance.post('/itineraries/', itinerary)
}

export const createItineraryWithIARequest = (itinerary:Itinerary) =>{
  return instance.post('/itineraries/ia',itinerary)
}

export const getItinerariesRequest = async (userId: ObjectId) => {
  return instance.get(`/itineraries/${userId}`)
}

export const getItinerariesByUserRequest = async (userId: ObjectId) => {
  return instance.get(`/itineraries/user/${userId}`)
}

export const getItineraryRequest = async (id: ObjectId) => {
  return instance.get(`/itineraries/${id}`)
}

export const updateItineraryRequest = async (itinerary: Itinerary) => {
  return instance.patch(`/itineraries/${itinerary.id}`,itinerary )
}

export const deleteItineraryRequest = (id: ObjectId) => {
  return instance.delete(`/itineraries/${id}`)
}