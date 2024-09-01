import axios from './axios'
import Itinerary from '../interfaces/Itinerary'
import { ObjectId } from "@mikro-orm/mongodb";

export const createItineraryRequest = (itinerary: Itinerary) => {
  return axios.post('/itinerarios', itinerary)
}

export const getItinerariesRequest = async () => {
  return axios.get('/itinerarios')
}

export const getItineraryRequest = async (id: ObjectId) => {
  return axios.get(`/itinerarios/${id}`)
}

export const updateItineraryRequest = async (id: ObjectId, itinerary: Itinerary) => {
  return axios.put(`/itinerarios/${id}`, itinerary)
}

export const deleteItineraryRequest = (id: ObjectId) => {
  return axios.delete(`/itinerarios/${id}`)
}