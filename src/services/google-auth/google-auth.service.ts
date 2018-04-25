import { ServerResponse } from './../../models/custom-auth-models/server-response.interface';
import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Subscription";
import { HttpHeaders } from "@angular/common/http";
//
import { GGL_CLIENT_ID, GGL_API_KEY } from "../../data/auth-data"

import { UserApiService } from "../user-api/user-api.service";
import { AuthService } from "../auth-service.interface";

import { UserDataBase } from "../../models/user-data-base.interface";
import { SignInResult } from "../../models/google-auth-models/sign-in-result.interface";
import { AuthResponse } from '../../models/custom-auth-models/auth-response.interface';

import { UserAuthData } from "../../models/google-auth-models/user-auth-data.interface";
import { Provider } from "../../models/provider.enum";

const EXTRA_SCOPES = "https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.me";
/**
 * << READ THIS >>
 * 1.   Using this service requires the api 'https://apis.google.com/js/platform.js' .
 *      Add this line <script src="https://apis.google.com/js/platform.js" async defer></script>
 *      to the index.html file .
 * 
 * 2.   define the string 'CLIENT_ID' in an external json file, and import it to this service . 
 * 
 * doc :
 *  https://developers.google.com/identity/protocols/OAuth2UserAgent#example
 */

@Injectable()
export class GoogleAuthService implements AuthService {



    // reasurce
    private auth2;
    private udb: UserDataBase;
    private isAuth2Init = false;
    private auth2InitEvent: Subject<void> = new Subject();
    private delayedSignInOnLoadEvent: Subject<void> = new Subject();


    constructor(private userApi: UserApiService) {
        /**
         * doc : 
         *  https://developers.google.com/identity/protocols/OAuth2UserAgent#example
         *  https://developers.google.com/identity/protocols/OAuth2UserAgent#creatingclient
         */
        // prevent duplicate code
        const setAuthRes = () => {
            // listening to both client and auth2 objects.
            window['gapi'].load('client:auth2', () => {
                this.auth2 = window['gapi'].auth2.init({
                    client_id: GGL_CLIENT_ID,
                    fetch_basic_profile: true,
                    scope: `profile ${EXTRA_SCOPES}`
                });
                window['gapi'].client.init({
                    'apiKey': GGL_API_KEY,
                    'clientId': GGL_CLIENT_ID,
                    'scope': `https://www.googleapis.com/auth/drive.metadata.readonly  ${EXTRA_SCOPES}`,
                    'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
                });

                const authInstance = window['gapi'].auth2.getAuthInstance();
                authInstance.isSignedIn.listen(() => {
                    console.log('isSignedIn.listen');
                    this.userApi.getUserData(this.getAuthHeader());
                    this.delayedSignInOnLoadEvent.next();
                });

                this.isAuth2Init = true;
                this.auth2InitEvent.next();
            });
        }

        // if the plugin has been loaded
        if (document.readyState === 'complete') {
            setAuthRes();
        } else {
            // if the plugin has not been loaded, listening to load event of window
            // and when it dispatched calling setAuth2()
            try {
                window.addEventListener('load', (e) => {
                    setAuthRes();
                });
            } catch (ex) {
                console.log(ex);
            }
        }
    }


    //#region :: public AuthService API mathods

    public async onSignIn(): Promise<UserDataBase> {

        // auth2 is init and the user signed out.
        if (this.isAuth2Init && !this.auth2.isSignedIn.get()) {
            // sign in the user using google services.
            const res = await this.auth2.signIn();
            console.log('User signed in.');

            const tok = res.Zi.id_token

            // sign in the user using server.
            const serverRes = await this.userApi.postSignInUser(Provider.GOOGLE_PROVIDER, { idToken: tok });

           // authenticate the server response. / validating the returned user id.
           this.authenticateServerResponse(serverRes.body);

            // saving the signed user data in the service.
            this.udb = serverRes.body.data.user;

            return this.udb;
        } else {
            throw new Error('the user is sign in or the auth2 object is\'nt initialized');
        }
    }

    public async onSignOut(): Promise<void> {
        if (this.isAuth2Init && this.auth2.isSignedIn.get()) {
            await this.auth2.signOut(); // this method do have no return value
            console.log('User signed out.');

            await this.userApi.deleteUserCurToken(this.getAuthHeader());
        
        } else {
            throw new Error('the user is\'nt sign in or the auth2 object is\'nt initialized');
        }
    }

    /**
     * @returns true if the current user is currently signed in. 
     * if the auth2 object is not initialized it will return false.
     */
    public isSignIn(): boolean {
        if (this.isAuth2Init) {
            return this.auth2.isSignedIn.get();
        } else {
            return false;
        }
    }

    public getProfile(): undefined | UserDataBase {
        if (this.isAuth2Init && this.auth2.isSignedIn.get()) {
            return this.udb;
        } else {
            console.log('the user is\'nt sign in');
        }
    }

    public getProvider(): Provider {
        return Provider.GOOGLE_PROVIDER;
    }

    public getAuthHeader(): HttpHeaders {
        const tok = this.getUserAuthData().id_token;
        return new HttpHeaders({ 'x-auth': tok, 'x-provider': 'google' })
    }

    //#endregion 


    //#region :: public resource initialized methods

    /** @description subscribe to auth resource done initializing event. 
     * @param {function=} callback Optional callback.
     * @returns {Subscription} subscription object from this event subscribing.
     */
    public authResInitEventSubscribe(callback: () => void): Subscription {
        return this.auth2InitEvent.subscribe(callback);
    }

    /** @description subscribe to delayed signIn event. 
     *          when the user is allready signed in when the app load. 
     * @param {function=} callback Optional callback.
     * @returns {Subscription} subscription object from this event subscribing.
     */
    public delayedSignInOnLoadEventSubscribe(callback: () => void): Subscription {
        return this.delayedSignInOnLoadEvent.subscribe(callback);
    }

    /**
     * @returns true if the auth2 object is initialized.
     */
    public isAuthResourceInit(): boolean {
        return this.isAuth2Init;
    }

    //#endregion 


    //#region :: private methods


    private getUserAuthData(): undefined | UserAuthData {
        // doc : https://developers.google.com/identity/sign-in/web/reference#googleauthcurrentuserget
        if (this.auth2.isSignedIn.get()) {
            const curUser = this.auth2.currentUser.get();
            const userAuthData = curUser.Zi;
            return userAuthData;
        } else {
            console.log('the user is\'nt sign in');
        }
    }

    private authenticateServerResponse(res: ServerResponse<AuthResponse>): boolean {
        const { authValue } = res.data;
        const authuid = this.auth2.currentUser.get().getBasicProfile().getId();
        return authValue === authuid;
    }

    //#endregion ******



}
