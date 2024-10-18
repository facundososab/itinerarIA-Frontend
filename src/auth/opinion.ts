import { ObjectId } from "@mikro-orm/mongodb";
import Opinion from "../interfaces/Opinion.ts";
import instance from "./axios.ts";

export const createOpinionRequest = async(opinion: Opinion) => {
  return instance.post("/opiniones", opinion);
}

export const getAllOpinionsRequest = async () => {
  return instance.get("/opiniones");
}

export const getOpinionRequest = async (id: ObjectId) => {
  return instance.get(`/opiniones/${id}`);
}

export const updateOpinionRequest = async (opinion: Opinion) => {
  return instance.put(`/opiniones/${opinion.id}`, opinion);
}

export const deleteOpinionRequest = async(id: ObjectId) => {
  return instance.delete(`/opiniones/${id}`);
}