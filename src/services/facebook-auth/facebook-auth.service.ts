import { HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { EnvironmentService } from '../environment/environment.service';
import { AuthStrategyService } from "../auth-strategy-service.abstract";
import { UserApiService } from './../user-api/user-api.service';

import { UserDataBase } from './../../models/user-data-base.interface';
import { AuthResponse } from './../../models/custom-auth-models/auth-response.interface';
import { Provider } from "../../models/provider.enum";
import { ServerResponse } from '../../models/custom-auth-models/server-response.interface';

/**
 * doc - https://developers.facebook.com/docs/facebook-login/web#example
 * 
*/
@Injectable()
export class FacebookAuthStrategyService extends AuthStrategyService {

    private fbAuth;
    private fbAuthInitEvent: Subject<void> = new Subject();
    private isfbAuthInit = false;


    constructor(private environment: EnvironmentService, userApi: UserApiService) {
        super(Provider.FACEBOOK_PROVIDER, 'facebook', userApi);
        if (this.environment.isProd()) {
            this.facebookAuthResourceInit();
        }
    }


    /************************ public ************************/

    public async onSignIn(params = undefined): Promise<UserDataBase> {
        /**
         * doc : 
         *  https://developers.facebook.com/docs/reference/javascript/FB.login/v2.12
         *  scope - https://developers.facebook.com/docs/facebook-login/permissions
         */
        if (this.environment.isDev()) {
            return await this._signInToServer(params);
        }
        // this.fbAuth.login work only with callback.
        return await this.fbAuth.login(
            async (res) => {

                console.log(res); 
                if (res != undefined && res.status === 'connected') {
                    
                    const {authResponse} = res;
                    console.log(res);
                    // sign in the user using server.
                    return await this._signInToServer({token: authResponse.accessToken});
                } else {
                    console.log('The person is not logged into this app or we are unable to tell.');
                }
            }, { scope: 'public_profile,email' });
    }

    public async onSignOut() {
        /**
         * doc : 
         *  https://developers.facebook.com/docs/facebook-login/web#logout
         */
        const tmpProfile = this.userDbProfile;
        const headers = this.getAuthHeader();

        try {
            this.userDbProfile = undefined;
            const res = await this.fbAuth.logout();
            console.log(res);

        } catch(e) {
            this.userDbProfile = tmpProfile;
        }
        await this._signOutFromServer(headers);
    }

    public isSignIn(): boolean {
        /**
         * doc : 
         *  https://developers.facebook.com/docs/reference/javascript/FB.getAuthResponse/
         */
        if (this.fbAuth == undefined) {
            return false;
        } else {
            const authRes = this.fbAuth.getAuthResponse();
            if (authRes == null || authRes == undefined) {
                return false;
            }
        }
        return true;
    }

    public getAuthHeader(): HttpHeaders {
        const authRes = this.fbAuth.getAuthResponse();
        console.log(authRes);
        const token = authRes.accessToken;
        return this._buildAuthHeader({token, providerName: this.getProviderName()});
    }

    /** @description subscribe to auth resource done initializing event. 
     * @param {function=} callback Optional callback.
     * @returns {Subscription} subscription object from this event subscribing.
     */
    public authResInitEventSubscribe(callback: () => void): Subscription {
        return this.fbAuthInitEvent.subscribe(callback);
    }

    /**
     * @returns true if the auth2 object is initialized.
     */
    public isAuthResourceInit() {
        return this.isfbAuthInit;
    }

    public getToken(): string {
        const authRes = this.fbAuth.getAuthResponse();
        return authRes.accessToken;
    }


    /************************ protected ************************/

    protected authenticateServerResponse(res: AuthResponse): boolean {
        const authValue = res.authValue;
        console.log(authValue);
        const authRes = this.fbAuth.getAuthResponse();
        console.log(authRes);
        const authuid = authRes.userID;
        return authValue == authuid;
    }


    /************************ private ************************/

    private facebookAuthResourceInit() {
        /**
         * doc : 
         *  https://developers.facebook.com/docs/javascript/quickstart
         *  https://developers.facebook.com/docs/javascript/reference/FB.init/v3.0
         */
        window['fbAsyncInit'] = () => {
            window['FB'].init({
                appId: this.environment.get('FB_APP_ID'),
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v2.12',
                status: true
            });
            this.fbAuth = window['FB']; 
            this.isfbAuthInit = true;
            this.fbAuthInitEvent.next();

        };

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

}

interface FBAuthResponse {
    status: string,
    authResponse: {
        accessToken: string,
        expiresIn: string,
        signedRequest: string,
        userID: string
    }
}