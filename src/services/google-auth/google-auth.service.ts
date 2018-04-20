import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Subscription";
import { HttpHeaders } from "@angular/common/http";
//
import { GGL_CLIENT_ID, GGL_API_KEY } from "../../data/auth-data"

import { UserApiService } from "../user-api/user-api.service";
import { AuthService } from "../auth-service.interface";
import { Profile } from "../../models/profile.interface";
import { SignInResult } from "../../models/google-auth-models/sign-in-result.interface";
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
            let auth_flag = false, client_flag = false;

            window['gapi'].load('auth2', () => {
                this.auth2 = window['gapi'].auth2.init({
                    client_id: GGL_CLIENT_ID,
                    fetch_basic_profile: true,
                    scope: `profile ${EXTRA_SCOPES}`
                });
                auth_flag = true;
                dispatchAuthRes(auth_flag, client_flag);

            });
            window['gapi'].load('client', () => {
                window['gapi'].client.init({
                    'apiKey': GGL_API_KEY,
                    'clientId': GGL_CLIENT_ID,
                    'scope': `https://www.googleapis.com/auth/drive.metadata.readonly  ${EXTRA_SCOPES}`,
                    'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
                });

                const authIns = window['gapi'].auth2.getAuthInstance();
                // doc :
                authIns.isSignedIn.listen(() => {
                    console.log('isSignedIn.listen - true');
                    this.delayedSignInOnLoadEvent.next();
                });
                client_flag = true;
                dispatchAuthRes(auth_flag, client_flag);
            });
        }

        const dispatchAuthRes = (a, c) => {
            if (a && c) {
                this.isAuth2Init = true;
                this.auth2InitEvent.next();
            }
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

    public async onSignIn(): Promise<SignInResult> {
        if (this.isAuth2Init && !this.auth2.isSignedIn.get()) {
            const res = await this.auth2.signIn();
            console.log('User signed in.');
            const signInResult: SignInResult = {
                profile: this.parseToProfile(res.w3),
                authData: res.Zi
            }
            const serverRes = await this.userApi.postSignInUser(Provider.GOOGLE_PROVIDER, { idToken: signInResult.authData.id_token });
            console.log(serverRes);
            return signInResult;
        } else {
            throw new Error('the user is sign in or the auth2 object is\'nt initialized');
        }
    }

    public async onSignOut(): Promise<void> {
        if (this.isAuth2Init && this.auth2.isSignedIn.get()) {
            await this.auth2.signOut(); // this method do have no return value
            console.log('User signed out.');
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

    public getProfile(): undefined | Profile {
        if (this.isAuth2Init && this.auth2.isSignedIn.get()) {
            const profile = this.auth2.currentUser.get().getBasicProfile();
            console.log(profile);
            console.log(this.getUserAuthData());
            return this.parseToProfile(profile);
        } else {
            console.log('the user is\'nt sign in');
        }
    }

    public getProvider(): Provider {
        return Provider.GOOGLE_PROVIDER;
    }

    public getAuthHeader(): HttpHeaders {
        const tok = this.getUserAuthData().id_token;
        return new HttpHeaders({ 'x-auth': tok })
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

    private parseToProfile(profileObj): Profile {
        const profile: Profile = {
            id: profileObj.getId(),
            fullName: profileObj.getName(),
            givenName: profileObj.getGivenName(),
            familyName: profileObj.getFamilyName(),
            imageUrl: profileObj.getImageUrl(),
            email: profileObj.getEmail(),
            provider: Provider.GOOGLE_PROVIDER
        }
        return profile;
    }

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

    //#endregion ******

}
