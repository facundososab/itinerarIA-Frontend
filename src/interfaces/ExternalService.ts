import { ObjectId } from "@mikro-orm/mongodb";
import Place from "./Place.ts";

export default interface ExternalService {
    id: ObjectId,
  serviceType: string,
  name: string,
  description: string,
  address: string,
  schedule?: string,
  website?: string,
  phoneNumber?: string,
  place: Place,
  status: ExternalServiceStatus,
}

export enum ExternalServiceStatus {
  Pending = 'PENDING',
  Active = 'ACTIVE',
  Canceled = 'CANCELED',
}