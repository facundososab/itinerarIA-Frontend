import { ObjectId } from "@mikro-orm/mongodb";

export default interface Preference {
    id: ObjectId;
    name: string;
    description: string;
}