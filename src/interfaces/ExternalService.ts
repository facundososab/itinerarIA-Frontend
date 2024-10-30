import { ObjectId } from "@mikro-orm/mongodb";
import Place from "./Place.ts";

export default interface ExternalService {
    id: ObjectId,
  serviceType: string,
  name: string,
  description: string,
  adress: string,
  schedule?: string,
  website?: string,
  phoneNumber?: string,
  place: Place,
}