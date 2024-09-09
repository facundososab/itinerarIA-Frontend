import { ObjectId } from "@mikro-orm/mongodb";

type CoordenadasGeograficas = {
    latitud: number,
    longitud: number,
}

export default interface Place {
    id: ObjectId
    nombre: string;
    ubicacion: CoordenadasGeograficas
    codigoPostal: string
    provincia: string
    pais: string
    //serviciosExternos = ServicioExterno[]
    //actividades = Actividad[]
}