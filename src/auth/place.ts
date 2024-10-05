import axios from './axios'
import Place from '../interfaces/Place'
import { ObjectId } from "@mikro-orm/mongodb";

export const createPlaceRequest = (place: Place) => {
    return axios.post('/lugares', place)
}

export const getAllPlacesRequest = async () => {
    return axios.get('/lugares')
}

export const getPlaceRequest = async (id: ObjectId) => {
    //return axios.get(`/lugares/${id}`)
    return axios.get(`/lugares/${id}`);
}

export const updatePlaceRequest = async (place: Place) => {
    return axios.put(`/lugares/${place.id}`, place)
}

export const deletePlaceRequest = (id: ObjectId) => {
    return axios.delete(`/lugares/${id}`)
}