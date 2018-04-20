import { Provider } from './../models/provider.enum';
import { Profile } from './../models/profile.interface';
import { HttpHeaders } from '@angular/common/http';


export interface AuthService {
    onSignIn: (params?) => any,
    onSignOut: () => any,
    isSignIn: () => boolean,
    getProfile: () => Profile,
    getProvider: () => Provider,
    getAuthHeader: () => HttpHeaders
}