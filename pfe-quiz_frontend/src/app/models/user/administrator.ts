import { Experience } from "./experience";
import { Society } from "./society";
import { User } from "./User";


export class Administrator extends User{
    experiences:Experience[];
    superadmin:boolean;
    societies:Society[];
}