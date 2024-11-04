import { ObjectId } from "@mikro-orm/mongodb";
import Place from "./Place";
import Activity from "./Activity";
import Participant from "./Participant.ts";

export default interface Itinerary {
    id: ObjectId,
    title: string,
    description: string,
    dayStart: Date,
    dayEnd: Date,
    user: ObjectId | null,
    place : Place 
    preferences: string,
    activities: Activity[],
    participants: Participant[],
}
