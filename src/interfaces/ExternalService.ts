import { ObjectId } from "@mikro-orm/mongodb";
import Place from "./Place.ts";

export default interface ExternalService {
    id: ObjectId,
  tipoServicio: string,
  nombre: string,
  descripcion: string,
  direccion: string,
  horario?: string,
  sitioWeb?: string,
  telContacto?: string,
  lugar: Place,
}