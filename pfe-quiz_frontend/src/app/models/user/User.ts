import { Image } from "./image";
import { Role } from "./role";

import {Document} from "./document";

export class User{
    id:number;
    username:string;
    password:string;
    fullname:string;
    dateofbirth:Date;
    gender:string;
    cin:string;
    city:string;
    phone:number;
    type:string;
    imageprofile:Image;
    images:Image[];
    lastlogin:Date;
    isactive:boolean;
    role:Role;
    documents:Document[];

    /**optional */
    status:string;
    color:string;
}