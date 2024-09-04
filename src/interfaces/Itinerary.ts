import { ObjectId } from "@mikro-orm/mongodb";
import Place from "./Place";

export default interface Itinerary {
    id: ObjectId,
    title: string,
    description: string,
    duration: number,
    user: ObjectId | null,
    place : Place,
    preferences: string,
}
