import { ObjectId } from "@mikro-orm/mongodb";
import Activity from "../interfaces/Activity.ts";
import instance from "./axios.ts";

export const createActivityRequest = async(activity: Activity) => {
  return instance.post("/activities", activity);
}

export const getAllActivitiesRequest = async () => {
  return instance.get("/activities");
}

export const getActivityRequest = async (id: ObjectId) => {
  return instance.get(`/activities/${id}`);
}

export const updateActivityRequest = async (activity: Activity) => {
  return instance.put(`/activities/${activity.id}`, activity);
}

export const deleteActivityRequest = async(id: ObjectId) => {
  return instance.delete(`/activities/${id}`);
}