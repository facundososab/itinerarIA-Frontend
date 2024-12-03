import { ObjectId } from "@mikro-orm/mongodb";
import Activity from "./Activity.ts";
import User from "./User.ts";

export default interface Opinion {
    id: ObjectId;
    rating: number;
    comment: string;
    user: User;
    activity: Activity;
}