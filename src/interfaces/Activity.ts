import { ObjectId } from "@mikro-orm/mongodb";
import Place from "./Place.ts";
import Itinerary from "./Itinerary.ts";
import Opinion from "./Opinion.ts";

export default interface Activity {
    id: ObjectId;
    name: string;
    description: string;
    outdoor: boolean;
    transport:boolean;
    scheduleStart:string;
    scheduleEnd:string;
    place: Place;
    itinerary: Itinerary;
    opinions: Opinion[];
}
