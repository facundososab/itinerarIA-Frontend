import { ObjectId } from "@mikro-orm/mongodb";

/*type CoordenadasGeograficas = {
    latitud: number,
    longitud: number,
}
*/
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