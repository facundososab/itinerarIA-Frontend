import instance from './axios'
import Preference from '../interfaces/Preference'
import { ObjectId } from "@mikro-orm/mongodb";

export const createPreferenceRequest = (preference: Preference) => {
    return instance.post('/preferences', preference)
}

export const getPreferencesRequest = async () => {
    return instance.get('/preferences')
}

export const getPreferenceRequest = async (id: ObjectId) => {
    //return axios.get(`/preferences/${id}`)
    return instance.get(`/preferences/${id}`);
}

export const updatePreferenceRequest = async (preference: Preference) => {
    return instance.put(`/preferences/${preference.id}`, preference)
}

export const deletePreferenceRequest = (id: ObjectId) => {
    return instance.delete(`/preferences/${id}`)
}