import axios from './axios'
import Preference from '../interfaces/Preference'
import { ObjectId } from "@mikro-orm/mongodb";

export const createPreferenceRequest = (preference: Preference) => {
    return axios.post('/preferences', preference)
}

export const getPreferencesRequest = async () => {
    return axios.get('/preferences')
}

export const getPreferenceRequest = async (id: ObjectId) => {
    //return axios.get(`/preferences/${id}`)
    return axios.get(`/preferences/${id}`);
}

export const updatePreferenceRequest = async (preference: Preference) => {
    return axios.put(`/preferences/${preference.id}`, preference)
}

export const deletePreferenceRequest = (id: ObjectId) => {
    return axios.delete(`/preferences/${id}`)
}