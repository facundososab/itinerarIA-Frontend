import { ObjectId } from "@mikro-orm/mongodb";
import Place from "./Place.ts";
import Itinerary from "./Itinerary.ts";

export default interface Activity {
    id: ObjectId;
    name: string;
    description: string;
    outdoor: boolean;
    transport:boolean;
    schedule:TimeRanges;
    place: Place;
    itinerary: Itinerary;
    //opinions: Opinion[];
}
