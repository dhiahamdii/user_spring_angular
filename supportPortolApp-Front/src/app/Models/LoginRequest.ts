import { AppUserRole } from "./AppUserRole";

export class LoginRequest {
    username  !:string ;
    password  !:string ;
    role !:AppUserRole;
}