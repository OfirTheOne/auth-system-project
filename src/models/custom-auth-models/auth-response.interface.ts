import { User } from "./user.interface";

export interface AuthResponse {
    tokenData?: {
        token: string,
        expDate: number
    },
    userId?: string,
    user: User
}