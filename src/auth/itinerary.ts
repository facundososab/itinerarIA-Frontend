import instance from './axios.ts'
import Itinerary from '../interfaces/Itinerary'
import { ObjectId } from "@mikro-orm/mongodb";

export const createItineraryRequest = (itinerary: Itinerary) => {
  return instance.post('/itinerarios/', itinerary)
}

export const createItineraryWithIARequest = (itinerary:Itinerary) =>{
  return instance.post('/itinerarios/ia',itinerary)
}

export const getItinerariesRequest = async (userId: ObjectId) => {
  return instance.get(`/itinerarios/${userId}`)
}

export const getItinerariesByUserRequest = async (userId: ObjectId) => {
  return instance.get(`/itinerarios/user/${userId}`)
}

export const getItineraryRequest = async (id: ObjectId) => {
  return instance.get(`/itinerarios/${id}`)
}

export const updateItineraryRequest = async (itinerary: Itinerary) => {
  return instance.patch(`/itinerarios/${itinerary.id}`,itinerary )
}

export const deleteItineraryRequest = (id: ObjectId) => {
  return instance.delete(`/itinerarios/${id}`)
}