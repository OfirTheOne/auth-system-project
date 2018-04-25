import { UserDataBase } from "../user-data-base.interface";

export interface AuthResponse {
    tokenData?: {
        token: string,
        expDate: number
    },
    authValue ?: string,
    user: UserDataBase
}