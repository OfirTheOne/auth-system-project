import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { CustomAuthService } from './custom-auth/custom-auth.service';
import { GoogleAuthService } from './google-auth/google-auth.service';
import { FacebookAuthService } from './facebook-auth/facebook-auth.service';

import { AuthService } from './auth-service.interface';
import { Provider } from './../models/provider.enum';
import { Profile } from '../models/profile.interface';

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

    constructor(
        private custom: CustomAuthService,
        private google: GoogleAuthService,
        private facebook: FacebookAuthService) {
            
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
        this.google.delayedSignInOnLoadEventSubscribe(()=> {
            this.userStatusChangeEvent.next();
            this.setStrategy(Provider.GOOGLE_PROVIDER);
        });
    }

    public setStrategy(authProvider: Provider) {
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

    public isSignIn(): boolean {
        if (this.authService == undefined) {
            return false;
        } else {
            return this.authService.isSignIn();
        }
    }


    public getProfile(): undefined | Profile {
        if (this.authService != undefined) {
            return this.authService.getProfile();
        }
    }

    public getProvider(): undefined | Provider {
        return this.authService ? this.authService.getProvider() : undefined;
    }

    public authResInitEventSubscribe(callback: () => void): Subscription {
        return this.authResInitEvent.subscribe(callback);
    }

    public getIsAuthResInit(): boolean {
        return this.isAuthResInit;
    }

    public userStatusChangeEventSubscribe(callback: () => void): Subscription {
        return this.userStatusChangeEvent.subscribe(callback);
    }


    
    private chackIsAuthResInit(g: boolean, f: boolean, c: boolean): void {
        if(g && f && c ) {
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
            if(auth.isSignIn()) {
                await auth.onSignOut();
            }
        })
    }

    private getAuthProvidersArray() {
        return [this.custom, this.google, this.facebook];
    }

}
