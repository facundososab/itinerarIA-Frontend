import { ObjectId } from "@mikro-orm/mongodb";


export default interface Place {
    id: ObjectId
    nombre: string;
    ubicacion_latitud: number;
    ubicacion_longitud: number;
    codigoPostal: string
    provincia: string
    pais: string
    //serviciosExternos = ServicioExterno[]
    //activities = Activity[]
}