import instance from "./axios.ts";
import Participant from "../interfaces/Participant.ts";
import { ObjectId } from "@mikro-orm/mongodb";

export const createParticipantRequest = (participant: Participant) => {
  return instance.post('/participants', participant)
}

export const createFavoriteParticipantRequest = (participant: Participant) => {
  return instance.post(`/participants/favorite`, participant)
}

export const getParticipantsRequest = async (userId: ObjectId) => {
  return instance.get(`/participants/${userId}`)
}

export const getParticipantRequest = async (id: ObjectId) => {
  return instance.get(`/participants/${id}`)
}

export const updateParticipantRequest = async (participant: Participant) => {
  return instance.patch(`/participants/${participant.id}`,participant )
}

export const deleteParticipantRequest = (id: ObjectId) => {
  return instance.delete(`/participants/${id}`)
}