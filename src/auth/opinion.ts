import { ObjectId } from "@mikro-orm/mongodb";
import Opinion from "../interfaces/Opinion.ts";
import instance from "./axios.ts";

export const createOpinionRequest = async(opinion: Opinion) => {
  return instance.post("/opinions", opinion);
}

export const getAllOpinionsRequest = async () => {
  return instance.get("/opinions");
}

export const getAllOpinionsByActivityRequest = async (activityId: ObjectId) => {
  return instance.get(`/opinions/activity/${activityId}`);
}

export const getOpinionRequest = async (id: ObjectId) => {
  return instance.get(`/opinions/${id}`);
}

export const updateOpinionRequest = async (opinion: Opinion) => {
  return instance.put(`/opinions/${opinion.id}`, opinion);
}

export const deleteOpinionRequest = async(id: ObjectId) => {
  return instance.delete(`/opinions/${id}`);
}