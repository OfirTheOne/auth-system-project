import { Provider } from './../models/provider.enum';
import { UserDataBase } from './../models/user-data-base.interface';
import { HttpHeaders } from '@angular/common/http';


export interface AuthService {
    onSignIn: (params?) => Promise<UserDataBase>,
    onSignOut: () => any,
    isSignIn: () => boolean,
    getProfile: () => UserDataBase,
    getProvider: () => Provider,
    getAuthHeader: () => HttpHeaders
}