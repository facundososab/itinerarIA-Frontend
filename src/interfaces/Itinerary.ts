import { ObjectId } from "@mikro-orm/mongodb";
import User from "./User";

export default interface Itinerary {
    id: ObjectId,
    titulo: string,
    descripcion: string,
    cantDias: number,
    usuario: User
}