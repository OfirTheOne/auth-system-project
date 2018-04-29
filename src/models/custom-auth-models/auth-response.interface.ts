import { UserDataBase } from "../user-data-base.interface";

export interface AuthResponse {
    
    // define only on authCustomService, defines the token data.
    tokenData?: {
        token: string,
        expDate: number
    },


    // at this point, define only on authGoogleService resonse. 
    authValue ?: string, // used in a sign in / up action with social media server to validating the server response.
    
    user: UserDataBase, // the user object as it outputed from the data base.
    
    dataDefined: boolean //  a flag - is user personal data (e.g first/last name, birthdate) as been submited.
}