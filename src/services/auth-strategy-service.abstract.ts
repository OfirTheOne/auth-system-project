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

    protected userDbProfile: UserDataBase;
    // private class member :  provider 
    // private class member :  providerName 
    // private class member :  userApi  

    constructor(
        private provider: Provider,
        private providerName: string,
        private userApi: UserApiService) { }


    /************************ public ************************/

    public abstract onSignIn(params?): Promise<UserDataBase>;

    public abstract onSignOut(): any;

    public abstract isSignIn(): boolean;

    public abstract getAuthHeader(): HttpHeaders;

    public abstract getToken(): string;

    /**
     * signData contains the provider and token that stored on the local storage, 
     * if it defined it will be used as a auth header for the 'getUserData' method. if it undefined, 
     * the method 'getUserData' will recieve this.getAuthHeader() as auth header (assuming the user siged in).
     */
    public async getUserData(signData?: {token: string, providerName: string}): Promise<UserDataBase> {            let headers;
        if(signData) { // first priority to signData. if it defined it will be set to the authHeader.
            headers = this._buildAuthHeader(signData);  // 
        } else if(this.isSignIn()) {
            headers = this.getAuthHeader(); 
        }
        const authRes = await this.userApi.getUserData(headers);
        this.userDbProfile = authRes.user;
        
        return this.userDbProfile;
    }

    /**
     * 
     * @param newToken token recieved by the external plugin
     * @param oldToken token stored in the L.S
     */
    public async renewCurToken(newToken: string, oldToken: string) {
        if(this.isSignIn()) {

            const headers = this._buildAuthHeader({
                providerName: this.getProviderName(), 
                token : oldToken
            });
            
            return await this.userApi.postRenewToken(headers, {newToken});    
        }
    }

    public getProfile(): UserDataBase | undefined {
            return this.userDbProfile;
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
            if(this.authenticateServerResponse(res)) {
                this.userDbProfile = res.user;

            }
            console.log(res);
            return res;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    // mybe add this method --> public authResInitEventSubscribe(callback: () => void): Subscription;

    /************************ protected ************************/
    
    protected abstract authenticateServerResponse(res: AuthResponse): boolean;

    protected _buildAuthHeader(headersData: {token: string, providerName: string}): HttpHeaders {
        return new HttpHeaders({ 'x-auth': headersData.token, 'x-provider': headersData.providerName });
    }

    protected async _signInToServer(signInParams: { token?: string,  data?: { email, password } }): Promise<UserDataBase> {
        console.log(`_signInToServer : `,signInParams);
        let reqData;

        // sign in the user using third party services, e.g google, facebook.
        if (signInParams && 'token' in signInParams) {
            reqData = { idToken: signInParams.token };

        // sign in the user using custom server
        } else if (signInParams && 'data' in signInParams) {
            
            reqData = { email: signInParams.data.email, password: signInParams.data.password };
        }
        const serverRes = await this.userApi.postSignInUser(this.provider, reqData);

        // authenticate the server response. / validating the returned user id. 
        // TODO : throw ex if 'authResponse' is false
        const authResponse = this.authenticateServerResponse(serverRes.body.data);
        console.log(authResponse);
        // saving the signed user data in the service.
        this.userDbProfile = serverRes.body.data.user;
        return serverRes.body.data.user;
    }

    protected async _signOutFromServer(headers: HttpHeaders) {
        return await this.userApi.deleteUserCurToken(headers);
    }

    
}
