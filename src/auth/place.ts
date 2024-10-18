import instance from './axios'
import Place from '../interfaces/Place'
import { ObjectId } from "@mikro-orm/mongodb";

export const createPlaceRequest = (place: Place) => {
    return instance.post('/lugares', place)
}

export const getPlacesRequest = async () => {
    return instance.get('/lugares')
}

export const getPlaceRequest = async (id: ObjectId) => {
    //return axios.get(`/lugares/${id}`)
    return instance.get(`/lugares/${id}`);
}

export const updatePlaceRequest = async (place: Place) => {
    return instance.put(`/lugares/${place.id}`, place)
}

export const deletePlaceRequest = (id: ObjectId) => {
    return instance.delete(`/lugares/${id}`)
}