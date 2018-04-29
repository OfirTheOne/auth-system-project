import { Provider } from './../models/provider.enum';
import { UserDataBase } from './../models/user-data-base.interface';
import { HttpHeaders } from '@angular/common/http';
import { AuthResponse } from '../models/custom-auth-models/auth-response.interface';


export interface AuthService {
    onSignIn: (params?) => Promise<AuthResponse>,
    onSignOut: () => any,
    isSignIn: () => boolean,
    getProfile: () => UserDataBase,
    getProvider: () => Provider,
    getAuthHeader: () => HttpHeaders
}