import { stagger } from '\@angular/animations';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { AuthStrategyService } from './auth-strategy-service.abstract';
import { CustomAuthStrategyService as CAS } from './custom-auth/custom-auth.service';
import { GoogleAuthStrategyService as GAS } from './google-auth/google-auth.service';
import { FacebookAuthStrategyService as FAS } from './facebook-auth/facebook-auth.service';
import { UserApiService as UAS } from './user-api/user-api.service';

import { UserDataBase } from './../models/user-data-base.interface';
import { Provider } from './../models/provider.enum';

@Injectable()
export class AgentAuthService {

    // oobject that manage the declared provider in the local storage
    private pdm: ProviderDeclaretionManeger = new ProviderDeclaretionManeger();

    // class member, contains the current authStrategy strategy according to what the user chooses.
    private authStrategy: AuthStrategyService;

    // event, dispatch when all auth related resources are loaded,
    // when google and facebook plugin is loaded.  
    private authResInitEvent: Subject<void> = new Subject();

    private userStatusChangeEvent: Subject<void> = new Subject();

    // flag, set to true when all auth related resources are loaded.
    private isAuthResInit: boolean = false;

    constructor(
        private custom: CAS, // auth strategy 01
        private google: GAS, // auth strategy 02
        private facebook: FAS, // auth strategy 03
    ) {

        this.setStrategyByDeclaredProvider();
        this.waitForAllResInit();


    }

    /************ public methods ************/

    public async onSignIn(params?) {
        if (this.authStrategy == undefined) {
            throw new Error('Auth service is not initialized');
        } else {
            const res = await this.authStrategy.onSignIn(params);
            this.pdm.declareProvider(this.authStrategy.getProviderName());
            this.userStatusChangeEvent.next();
            return res;
        }
    }

    public async onSignOut() {
        if (this.authStrategy == undefined) {
            throw new Error('Auth service is not initialized');
        } else {
            const res = await this.authStrategy.onSignOut();
            this.pdm.undeclareProvider();
            this.userStatusChangeEvent.next();
            return res;
        }
    }

    public isSignIn(): boolean {
        if (this.authStrategy == undefined) {
            return false;
        } else {
            return this.authStrategy.isSignIn();
        }
    }

    public async onUpdateUserData(userData) {
        try {
            await this.authStrategy.onUpdateUserData(userData);
        } catch (e) {
            console.log(e);
        }
    }

    public setStrategy(authProvider: Provider): void {
        switch (authProvider) {
            case Provider.CUSTOM_PROVIDER:
                this.authStrategy = this.custom;
                break;
            case Provider.GOOGLE_PROVIDER:
                this.authStrategy = this.google;
                break;
            case Provider.FACEBOOK_PROVIDER:
                this.authStrategy = this.facebook;
                break;
            default:
                break;
        }
    }

    public getProfile(): undefined | UserDataBase {
        if (this.authStrategy != undefined) {
            return this.authStrategy.getProfile();
        }
    }

    public getProvider(): undefined | Provider {
        return this.authStrategy ? this.authStrategy.getProvider() : undefined;
    }

    
    // signIn events related

    public getIsAuthResInit(): boolean {
        return this.isAuthResInit;
    }

    public authResInitEventSubscribe(callback: () => void): Subscription {
        return this.authResInitEvent.subscribe(callback);
    }

    public userStatusChangeEventSubscribe(callback: () => void): Subscription {
        return this.userStatusChangeEvent.subscribe(callback);
    }


    /************ private methods ************/

    private chackIsAuthResInit(g: boolean, f: boolean, c: boolean): void {
        if (g && f && c) {
            this.isUserSignInOnLoad();
            this.isAuthResInit = true;
            this.authResInitEvent.next();
        }
    }

    private isUserSignInOnLoad() {
        this.authStrategy = [this.google, this.facebook, this.custom]
            .find((auth) => {
                const res = auth.isSignIn();
                return res;
            });
    }

    private cleanAllSignInProviders() {
        const authProviders = this.getAuthStrategyArray();
        authProviders.forEach(async (auth) => {
            if (auth.isSignIn()) {
                await auth.onSignOut();
            }
        })
    }

    private getAuthStrategyArray(): AuthStrategyService[] {
        return [this.custom, this.google, this.facebook];
    }

    /* used once in the c'tor */
    private setStrategyByDeclaredProvider() {
        const strategyArray = this.getAuthStrategyArray();
        this.authStrategy = strategyArray.find((strategy) => {
            return strategy.getProviderName() == this.pdm.getDeclaredProvider();
        });
    }

    /* used once in the c'tor */
    private waitForAllResInit() {
        let g_init = false;
        let f_init = true;

        this.google.authResInitEventSubscribe(() => {
            g_init = true;
            this.chackIsAuthResInit(g_init, f_init, true);
        });
        this.facebook.authResInitEventSubscribe(() => {
            f_init = true;
            this.chackIsAuthResInit(g_init, f_init, true);
        });
    }

}

class ProviderDeclaretionManeger {
    private readonly keyName = 'sign_p';

    public declareProvider(providerName: string): void {
        localStorage.setItem(this.keyName, providerName)
    }

    public undeclareProvider(): void {
        localStorage.removeItem(this.keyName);
    }

    public isDeclared(): boolean {
        return localStorage.getItem(this.keyName) != undefined;
    }

    public getDeclaredProvider() : string {
        return localStorage.getItem(this.keyName);
    }
}
