import { ObjectId } from "@mikro-orm/mongodb";
import ExternalService from "../interfaces/ExternalService.ts";
import instance from "./axios.ts";

export const createExternalServiceRequest = async(externalService: ExternalService) => {
  return instance.post("/externalServices", externalService);
}

export const getAllExternalServicesRequest = async () => {
  return instance.get("/externalServices");
}

export const getExternalServiceRequest = async (id: ObjectId) => {
  return instance.get(`/externalServices/${id}`);
}

export const updateExternalServiceRequest = async (externalService: ExternalService) => {
  return instance.put(`/externalServices/${externalService.id}`, externalService);
}

export const deleteExternalServiceRequest = async(id: ObjectId) => {
  return instance.delete(`/externalServices/${id}`);
}

