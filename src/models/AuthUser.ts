import { UserData } from "./UserData";

export interface AuthUser {
    id: string,
    isAdmin: boolean,
    userDate: UserData,
}
