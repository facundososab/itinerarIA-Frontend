import { ObjectId } from "@mikro-orm/mongodb";
import Activity from "./Activity.ts";
// import User from "./User.ts";

export default interface Opinion {
    id: ObjectId;
    calificacion: number;
    comentario: string;
    usuario: ObjectId;
    activity: ObjectId;
}