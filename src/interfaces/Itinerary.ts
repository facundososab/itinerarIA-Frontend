import { ObjectId } from "@mikro-orm/mongodb";
import User from "./User";
import Place from "./Place";

export default interface Itinerary {
    id: ObjectId,
    title: string,
    description: string,
    duration: number,
    user: User,
    place : Place,
    preferences: string,
}