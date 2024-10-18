import { ObjectId } from "@mikro-orm/mongodb";
import Activity from "../interfaces/Activity.ts";
import instance from "./axios.ts";

export const createActivityRequest = async(activity: Activity) => {
  return instance.post("/actividades", activity);
}

export const getAllActivitiesRequest = async () => {
  return instance.get("/actividades");
}

export const getActivityRequest = async (id: ObjectId) => {
  return instance.get(`/actividades/${id}`);
}

export const updateActivityRequest = async (activity: Activity) => {
  return instance.put(`/actividades/${activity.id}`, activity);
}

export const deleteActivityRequest = async(id: ObjectId) => {
  return instance.delete(`/actividades/${id}`);
}