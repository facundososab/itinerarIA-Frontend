import { ObjectId } from "@mikro-orm/mongodb";
import Place from "./Place";
import Activity from "./Activity";
import Participant from "./Participant.ts";
import User from "./User.ts";

export default interface Itinerary {
    id: ObjectId ,
    title: string,
    description?: string,
    dayStart: Date,
    dayEnd: Date,
    user: User,
    place : Place 
    activities: Activity[],
    participants: Participant[],
}
