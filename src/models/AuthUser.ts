import { UserData } from "./UserData";

export interface AuthUser {
    id: string,
    ownedOrganizations: string[],
    userData: UserData,
}
