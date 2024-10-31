import instance from './axios'
import Place from '../interfaces/Place'
import { ObjectId } from "@mikro-orm/mongodb";

export const createPlaceRequest = (place: Place) => {
    return instance.post('/places', place)
}


export const getAllPlacesRequest = async () => {
    return instance.get('/places')

}

export const getPlaceRequest = async (id: ObjectId) => {
    //return axios.get(`/places/${id}`)
    return instance.get(`/places/${id}`);
}

export const updatePlaceRequest = async (place: Place) => {
    return instance.put(`/places/${place.id}`, place)
}

export const deletePlaceRequest = (id: ObjectId) => {
    return instance.delete(`/places/${id}`)
}