import { ObjectId } from "@mikro-orm/mongodb";

export default interface User {
    id: ObjectId;
    username: string;
    password: string;
    name: string;
    lastName: string;
    mail: string;
    phoneNumber: string;
    dateOfBirth: string;
}

