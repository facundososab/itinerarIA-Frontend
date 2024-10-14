import { ObjectId } from "@mikro-orm/mongodb";
import Activity from "../interfaces/Activity.ts";
import axios from "./axios.ts";

export const createActivityRequest = async(activity: Activity) => {
  return axios.post("/actividades", activity);
}

export const getAllActivitiesRequest = async () => {
  return axios.get("/actividades");
}

export const getActivityRequest = async (id: ObjectId) => {
  return axios.get(`/actividades/${id}`);
}

export const updateActivityRequest = async (activity: Activity) => {
  return axios.put(`/actividades/${activity.id}`, activity);
}

export const deleteActivityRequest = async(id: ObjectId) => {
  return axios.delete(`/actividades/${id}`);
}