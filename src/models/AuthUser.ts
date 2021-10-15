import { UserData } from "./UserData";

export interface AuthUser {
    id: string,
    isAdmin: boolean,
    userData: UserData,
}
