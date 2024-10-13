import axios from "./axios.ts";
import Participant from "../interfaces/Participant.ts";
import { ObjectId } from "@mikro-orm/mongodb";

export const createParticipantRequest = (participant: Participant) => {
  return axios.post('/participants', participant)
}

export const createFavoriteParticipantRequest = (participant: Participant) => {
  return axios.post(`/participants/favorite`, participant)
}

export const getParticipantsRequest = async (userId: ObjectId) => {
  return axios.get(`/participants/${userId}`)
}

export const getParticipantRequest = async (id: ObjectId) => {
  return axios.get(`/participants/${id}`)
}

export const updateParticipantRequest = async (participant: Participant) => {
  return axios.patch(`/participants/${participant.id}`,participant )
}

export const deleteParticipantRequest = (id: ObjectId) => {
  return axios.delete(`/participants/${id}`)
}