import { ObjectId } from "@mikro-orm/mongodb";


export default interface Place {
    id: ObjectId
    name: string;
    latitude: number;
    longitude: number;
    zipCode: string
    province: string
    country: string
}