import ExternalService from "../interfaces/ExternalService.ts";
import instance from "./axios.ts";


// Para el CU de publicidad

export const addPublicityRequest = async (externalService: ExternalService) => {
  return instance.post("/publicity", externalService);
}

export const getAllPlacesRequest = async () => {
  return instance.get("/publicity/places");
}



