import { UserDataBase } from './../user-data-base.interface';
import { UserAuthData } from "./user-auth-data.interface";

export interface SignInResult {
    authData: UserAuthData,
    udb: UserDataBase
}

