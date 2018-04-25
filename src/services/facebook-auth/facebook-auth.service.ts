import { UserApiService } from './../user-api/user-api.service';
import { UserDataBase } from './../../models/user-data-base.interface';
import { AuthResponse } from './../../models/custom-auth-models/auth-response.interface';
import { Injectable } from "@angular/core";
// import { FB_APP_ID } from "../../data/auth-data"

import { AuthService } from "../auth-service.interface";
import { Provider } from "../../models/provider.enum";
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { HttpHeaders } from '@angular/common/http';


const FB_APP_ID = '';//"193767451426342";
@Injectable()
export class FacebookAuthService implements AuthService {

    private fbAuth;
    private fbAuthInitEvent: Subject<void> = new Subject();
    private isfbAuthInit = false;

    private udb: UserDataBase;

    constructor(private userApi: UserApiService) {
        this.facebookAuthInit();
    }

    //#region :: public AuthService API mathods

    public async onSignIn() {
        /**
         * doc : 
         *  https://developers.facebook.com/docs/reference/javascript/FB.login/v2.12
         *  scope - https://developers.facebook.com/docs/facebook-login/permissions
         */
        const res = await this.fbAuth.login(undefined, { scope: 'public_profile,email' });
        console.log(res);
        if (res != undefined && res.status === 'connected') {

            // sign in the user using server.
            const serverRes = await this.userApi.postSignInUser(Provider.FACEBOOK_PROVIDER, { idToken: '' });
            this.udb = serverRes.body.data.user;
            return this.udb;

            // await this.setProfileData();
        } else {
            console.log('The person is not logged into this app or we are unable to tell.')
        }
        return null;
    };

    public async onSignOut() {
        /**
         * doc : 
         *  https://developers.facebook.com/docs/facebook-login/web#logout
         */
        const res = await this.fbAuth.logout();
        this.udb = undefined;
        console.log(res);
    }

    public isSignIn(): boolean {
        /**
         * doc : 
         *  https://developers.facebook.com/docs/reference/javascript/FB.getAuthResponse/
         */
        if (this.fbAuth == undefined) {
            return false;
        } else {
            const res = this.fbAuth.getAuthResponse();
            if (res == null || res == undefined) {
                return false;
            }
        }
    }

    public getProfile(): UserDataBase {
        return this.udb;
    }

    public getProvider(): Provider {
        return Provider.FACEBOOK_PROVIDER;
    }

    public getAuthHeader(): HttpHeaders {
        // return x-provider and x-auth
        return null;
    }
    //#endregion


    //#region :: public resource initialized methods

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
    //#endregion ***


    //#region :: private methods

    private facebookAuthInit() {
        /**
         * doc : 
         *  https://developers.facebook.com/docs/javascript/quickstart
         */
        window['fbAsyncInit'] = () => {
            window['FB'].init({
                appId: FB_APP_ID,
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v2.12',
                status: true
            });
            this.fbAuth = window['FB'];
            // 
            this.isfbAuthInit = true;
            this.fbAuthInitEvent.next();

            /*
            if (this.isSignIn()) {
                this.setProfileData();
            }
            */
        };

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    /*
    
    private async setProfileData() {
        
         // doc  : 
         //  https://developers.facebook.com/docs/graph-api/reference/user/#Reading
        
        const res = await this.fbAuth.api('/me');
        console.log(res);
        this.userProfile = this.parseToProfile(res);
    }

    private parseToProfile(profileData): Profile {
        const profile: Profile = {
            email: profileData.email,
            id: profileData.id,
            fullName: profileData.name,
            givenName: profileData.first_name,
            familyName: profileData.last_name,
            imageUrl: profileData.cover,
            provider: Provider.FACEBOOK_PROVIDER
        }
        return profile;
    }

    */

    //#endregion
}

interface FBAuthResponse {
    status: 'connected',
    authResponse: {
        accessToken: '...',
        expiresIn: '...',
        signedRequest: '...',
        userID: '...'
    }
}