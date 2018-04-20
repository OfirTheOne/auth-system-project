import { UserAuthData } from "./user-auth-data.interface";
import { Profile } from "../profile.interface";

export interface SignInResult {
    authData: UserAuthData,
    profile: Profile
}

