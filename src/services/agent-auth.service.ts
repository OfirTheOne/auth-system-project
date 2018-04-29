import { UserDataBase } from './../models/user-data-base.interface';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { CustomAuthService as CAS } from './custom-auth/custom-auth.service';
import { GoogleAuthService as GAS } from './google-auth/google-auth.service';
import { FacebookAuthService as FAS } from './facebook-auth/facebook-auth.service';
import { UserApiService as UAS } from './user-api/user-api.service';


import { AuthService } from './auth-service.interface';
import { Provider } from './../models/provider.enum';

@Injectable()
export class AgentAuthService {

    // class member, contains the current authService strategy according to what the user chooses.
    private authService: AuthService;

    // event, dispatch when all auth related resources are loaded,
    // when google and facebook plugin is loaded.  
    private authResInitEvent: Subject<void> = new Subject();

    private userStatusChangeEvent: Subject<void> = new Subject();

    // flag, set to true when all auth related resources are loaded.
    private isAuthResInit: boolean = false;

    constructor(private custom: CAS, private google: GAS, private facebook: FAS, private userApi: UAS) {

        let g_init = false;
        let f_init = false;
        /*
        let c_init = false;
        */
        this.google.authResInitEventSubscribe(() => {
            g_init = true;
            this.chackIsAuthResInit(g_init, f_init, true);
        });
        this.facebook.authResInitEventSubscribe(() => {
            f_init = true;
            this.chackIsAuthResInit(g_init, f_init, true);
        });
        /*
        this.google.delayedSignInOnLoadEventSubscribe(() => {
            this.userStatusChangeEvent.next();
            this.setStrategy(Provider.GOOGLE_PROVIDER);
        });
        */
    }

    //#region - user actions / talk with server

    public async onSignIn(params?) {
        if (this.authService == undefined) {
            throw new Error('Auth service is not initialized');
        } else {
            const res = await this.authService.onSignIn(params);
            this.userStatusChangeEvent.next();
            return res;
        }
    }

    public async onSignOut() {
        if (this.authService == undefined) {
            throw new Error('Auth service is not initialized');
        } else {
            const res = await this.authService.onSignOut();
            this.userStatusChangeEvent.next();
            return res;
        }
    }

    public async onUpdateUserData(userData) {
        const headers = this.authService.getAuthHeader();
        const body = { data: userData };
        try {
            const res = await this.userApi.postUserData(headers, body);
            console.log(res);
            return res;
        } catch (e) {
            console.log(e);
        }
    }

    //#endregion

    //#region - cur signed session data getters and setters

    public isSignIn(): boolean {
        if (this.authService == undefined) {
            return false;
        } else {
            return this.authService.isSignIn();
        }
    }

    public setStrategy(authProvider: Provider): void {
        switch (authProvider) {
            case Provider.CUSTOM_PROVIDER:
                this.authService = this.custom;
                break;
            case Provider.GOOGLE_PROVIDER:
                this.authService = this.google;
                break;
            case Provider.FACEBOOK_PROVIDER:
                /*this.authService = this.facebook;*/
                break;
            default:
                break;
        }
    }

    public getProfile(): undefined | UserDataBase {
        if (this.authService != undefined) {
            return this.authService.getProfile();
        }
    }

    public getProvider(): undefined | Provider {
        return this.authService ? this.authService.getProvider() : undefined;
    }

    //#endregion

    //#region - auth resourse releted methods and events subscribing

    public getIsAuthResInit(): boolean {
        return this.isAuthResInit;
    }

    public authResInitEventSubscribe(callback: () => void): Subscription {
        return this.authResInitEvent.subscribe(callback);
    }

    public userStatusChangeEventSubscribe(callback: () => void): Subscription {
        return this.userStatusChangeEvent.subscribe(callback);
    }

    //#endregion

    //#region - private methods

    private chackIsAuthResInit(g: boolean, f: boolean, c: boolean): void {
        if (g && f && c) {
            this.isUserSignInOnLoad();
            this.isAuthResInit = true;
            this.authResInitEvent.next();
        }
    }

    private isUserSignInOnLoad() {
        this.authService = [this.google, /*this.facebook,*/ this.custom]
            .find((auth) => {
                const res = auth.isSignIn();
                return res;
            });
    }

    private cleanAllSignInProviders() {
        const authProviders = this.getAuthProvidersArray();
        authProviders.forEach(async (auth) => {
            if (auth.isSignIn()) {
                await auth.onSignOut();
            }
        })
    }

    private getAuthProvidersArray(): AuthService[] {
        return [this.custom, this.google, this.facebook];
    }

    //#endregion
}
