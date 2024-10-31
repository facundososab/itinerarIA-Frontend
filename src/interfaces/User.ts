import { ObjectId } from "@mikro-orm/mongodb";

export default interface User {
    id: ObjectId;
    username: string;
    password: string;
    names: string;
    lastName: string;
    mail: string;
    phoneNumber: string;
    dateOfBirth: string;
}

