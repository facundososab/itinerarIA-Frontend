import { ObjectId } from "@mikro-orm/mongodb";
import Preference from "./Preference.ts";

export default interface Participant {
  readonly id: ObjectId,
  name: string,
  disability: boolean,
  age: number,
  preferences: Preference[],
  user?: ObjectId ,
}