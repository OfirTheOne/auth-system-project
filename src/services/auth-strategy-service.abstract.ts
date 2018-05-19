import { HttpHeaders } from '@angular/common/http';

import { UserApiService } from './user-api/user-api.service';

import { Provider } from './../models/provider.enum';
import { UserDataBase } from './../models/user-data-base.interface';
import { AuthResponse } from '../models/custom-auth-models/auth-response.interface';
import { ServerResponse } from '../models/custom-auth-models/server-response.interface';


/**
 * implemented protected methods are prefixed with _ , e.g protected _foo() { ... }  
 * 
*/

export abstract class AuthStrategyService {

    protected udb: UserDataBase;
    // private class member :  provider 
    // private class member :  providerName 
    // private class member :  userApi  

    constructor(
        private provider: Provider,
        private providerName: string,
        private userApi: UserApiService) { }


    /************************ public ************************/
    public abstract onSignIn(params?): Promise<AuthResponse>;

    public abstract onSignOut(): any;

    public abstract isSignIn(): boolean;

    public abstract getAuthHeader(): HttpHeaders;

    public getProfile(): UserDataBase | undefined {
        if (this.isSignIn()) {
            return this.udb;
        } else {
            console.log('the user is\'nt sign in');
        }
    }

    public getProvider(): Provider {
        return this.provider;
    }

    public getProviderName(): string {
        return this.providerName;
    }
    
    public async onUpdateUserData(userData) {
        const headers = this.getAuthHeader();
        const body = { data: userData };
        try {
            const res = await this.userApi.postUserData(headers, body);
            console.log(res);
            return res;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    // public authResInitEventSubscribe(callback: () => void): Subscription;

    /************************ protected ************************/
    protected abstract authenticateServerResponse(res: ServerResponse<AuthResponse>): boolean;

    protected _buildAuthHeader(token: string): HttpHeaders {
        return new HttpHeaders({ 'x-auth': token, 'x-provider': this.providerName });
    }

    /*
    protected async _signInToServer(signInParams: { data: { email, password } }): Promise<AuthResponse>; // custom auth 
    protected async _signInToServer(signInParams: { token: string }): Promise<AuthResponse>; // google & facebook auth
    protected async _signInToServer(signInParams: { token: string } | { data: { email, password } }): Promise<AuthResponse> {
        console.log(`_signInToServer : `,signInParams);
        let serverRes;
        if (signInParams && 'token' in signInParams) {
            // sign in the user using third party services, e.g google, facebook.
            serverRes = await this.userApi.postSignInUser(this.provider, 
                { idToken: signInParams.token });
        } else if (signInParams && 'data' in signInParams) {
            // sign in the user using custom server
            serverRes = await this.userApi.postSignInUser(this.provider,
                { email: signInParams.data.email, password: signInParams.data.password });
        }
        // authenticate the server response. / validating the returned user id.
        const authResponse = this.authenticateServerResponse(serverRes.body);
        console.log(authResponse);
        // saving the signed user data in the service.
        this.udb = serverRes.body.data.user;
        return serverRes.body.data;
    }

    */

    protected async _signInToServer(signInParams: { token?: string, data?: { email, password } }): Promise<AuthResponse> {
        console.log(`_signInToServer : `,signInParams);
        let serverRes;
        if (signInParams && 'token' in signInParams) {
            // sign in the user using third party services, e.g google, facebook.
            serverRes = await this.userApi.postSignInUser(this.provider, 
                { idToken: signInParams.token });
        } else if (signInParams && 'data' in signInParams) {
            // sign in the user using custom server
            serverRes = await this.userApi.postSignInUser(this.provider,
                { email: signInParams.data.email, password: signInParams.data.password });
        }
        // authenticate the server response. / validating the returned user id.
        const authResponse = this.authenticateServerResponse(serverRes.body);
        console.log(authResponse);
        // saving the signed user data in the service.
        this.udb = serverRes.body.data.user;
        return serverRes.body.data;
    }
    protected async _signOutFromServer(headers: HttpHeaders) {
        return await this.userApi.deleteUserCurToken(headers);
    }

}
