import { ObjectId } from "@mikro-orm/mongodb";

export default interface User {
    id: ObjectId;
    username: string;
    password: string;
    nombres: string;
    apellidos: string;
    mail: string;
    nroTelefono: string;
    fechaNacimiento: string;
}

