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
import { EnvironmentService } from './environment/environment.service';

@Injectable()
export class AgentAuthService {

    // object that manage the declared provider in the local storage
    private sdm: SignDeclaretionManeger = new SignDeclaretionManeger();

    // class member, contains the current authStrategy strategy according to what the user chooses.
    private authStrategy: AuthStrategyService;

    // event, dispatch when all auth related resources are loaded,
    // dispatch when google and facebook plugin is loaded.  
    private authResourcesInitEvent: Subject<void> = new Subject();

    private userStatusChangeEvent: Subject<void> = new Subject();

    // flag, set to true when all auth related resources are loaded.
    private isAuthResInit: boolean = false;

    private renewTokenRequestBeenSend = false;

    constructor(
        private custom: CAS, // auth strategy 01
        private google: GAS, // auth strategy 02
        private facebook: FAS, // auth strategy 03
        private environment: EnvironmentService
    ) {
        this.setStrategyByDeclaredProvider();
        this.waitForAllResInit();
    }

    /************************ public ************************/

    // sign in action.
    public async onSignIn(provider: Provider , params?) {
        this.setStrategy(provider);
        if (this.authStrategy == undefined) {
            throw new Error('Auth service is not initialized');
        } else {
            const res = await this.authStrategy.onSignIn(params);
            this.sdm.declareSignData({   
                providerName: this.authStrategy.getProviderName(), 
                token: this.authStrategy.getToken() 
            });
            this.userStatusChangeEvent.next();
            return res;
        }
    }

    // sign out action.
    public async onSignOut() {
        if (this.authStrategy == undefined) {
            throw new Error('Auth service is not initialized');
        } else {
            this.sdm.undeclareSignData();
            this.renewTokenRequestBeenSend = false;
            const res = await this.authStrategy.onSignOut();
            this.userStatusChangeEvent.next();
            return res;
        }
    }

    // inform is the user authenticate and in the system.
    /**
     *  the user is formally signed in the app if :
     *  - the authServise signIn returned true.
     *  - the userDataBase object is init ( this.authStrategy.getProfile() is defined).
     *  - the authServise token and the sdm token are the same.
     */
    public isSignIn(): boolean {
        let signStatus;
        if (this.authStrategy == undefined) {
            signStatus = false;
        } else {
            signStatus = this.authStrategy.isSignIn() && (this.authStrategy.getProfile() != undefined);
            console.log(`from isSignIn - ${JSON.stringify(this.authStrategy.getProfile())}`);
            
            if(signStatus) {
                const oldToken = this.sdm.getDeclaredSignData().token;
                const newToken = this.authStrategy.getToken();
                console.log(`newToken : ${newToken}`);
                console.log(`oldToken : ${oldToken}`);
                let isTokenUpToDate = (newToken == oldToken);
                console.log(`isTokenUpToDate : ${isTokenUpToDate}`);
                if(!isTokenUpToDate && !this.renewTokenRequestBeenSend) {
                    // set renewTokenRequestBeenSend to true so the request will not repeat it self ,
                    // this method is repeatedly being called.
                    console.log('need to renew token.');
                    this.renewTokenRequestBeenSend = true; 

                    // important - using then / catch so the method will stay sync .
                    this.authStrategy.renewCurToken(newToken, oldToken)
                        .then((d) => {
                            this.sdm.declareSignData({
                                token: newToken,
                                providerName: this.authStrategy.getProviderName()
                            });
                            console.log('renew token request success.', d);
                        })
                        .catch((e) => {console.log('renew token request failed.', e);});
                }

                signStatus = signStatus && isTokenUpToDate;
            }
        }
        return signStatus;
    }

    // update the signed in user data to the db.
    public async onUpdateUserData(userData: 
        { firstName: string, lastName: string, gender: string, birthDate: any }) {
        try {
            if(this.isSignIn()) {
                await this.authStrategy.onUpdateUserData(userData);
            }
        } catch (e) {
            console.log(e);
        }
    }

    // return the udb object in the current authStrategy object. undefined if the user not signed in.
    public getProfile(): undefined | UserDataBase {
        return this.authStrategy ? this.authStrategy.getProfile() : undefined;
    }

    // return the current provider enum. undefined if the user not signed in.
    public getProvider(): undefined | Provider {
        return this.authStrategy ? this.authStrategy.getProvider() : undefined;
    }

    // method used for subscribing to an event the will triger on eny sign user releted action.
    public userStatusChangeEventSubscribe(callback: () => void): Subscription {
        return this.userStatusChangeEvent.subscribe(callback);
    }


    // * resources events related * //

    public getIsAuthResInit(): boolean {
        return this.isAuthResInit;
    }

    public authResourcesInitEventSubscribe(callback: () => void): Subscription {
        return this.authResourcesInitEvent.subscribe(callback);
    }


    /************************ private ************************/

    /* used once in the c'tor */
    private waitForAllResInit() {
        let g_init = false;
        let f_init = 
            this.environment.isProd()? 
                false : 
                true;

        this.google.authResInitEventSubscribe(async () => {
            g_init = true;
            await this.chackIsAuthResInit(g_init, f_init, true);
        });
        this.facebook.authResInitEventSubscribe(async () => {
            f_init = true;
            await this.chackIsAuthResInit(g_init, f_init, true);
        });
    }

    /** @description
     * when google & facebook lib resources are loaded 'g', 'f' and 'c' will be true,
     * and that will triger 'authResInitEvent' event.
     */
    private async chackIsAuthResInit(g: boolean, f: boolean, c: boolean) {
        if (g && f && c) {
            try {
                if(this.sdm.isDeclared()) {
                    await this.getUserDataOnInit();

                }
            } catch(e) {
                console.log(e);
                // removing data from the L.S only if the request returned unauthorized error
                if('status' in e && e.status == 401) {
                    this.sdm.undeclareSignData();
                }
            }
            this.isAuthResInit = true;
            this.authResourcesInitEvent.next();
        }
    }

    /** @description
     * setting the auth strategy by a given provider, set before any signIn action.
     */
    private setStrategy(authProvider: Provider): void {
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

    /* used once in the c'tor */
    private setStrategyByDeclaredProvider() {
        const strategyArray = this.getAuthStrategyArray();
        this.authStrategy = strategyArray.find((strategy) => {
            let signData = this.sdm.getDeclaredSignData();
            let providerName = strategy.getProviderName();
            return providerName == signData.providerName;
        });
    }

    private getAuthStrategyArray(): AuthStrategyService[] {
        return [this.custom, this.google, this.facebook];
    }

    /** 
     * @description 
     * if 'authStrategy' defined, this method will call authStrategy.getCachedUserData() 
     * and return the resulte.
     */
    private async getUserDataOnInit() {
        if (this.authStrategy != undefined) {
            const signData = this.sdm.getDeclaredSignData();
            return await this.authStrategy.getUserData(signData);
        }
    }

    private async renewCurToken() {
        if (this.authStrategy != undefined) {
            const oldToken = this.sdm.getDeclaredSignData().token;
            const newToken = this.authStrategy.getToken();
            await this.authStrategy.renewCurToken(newToken, oldToken);
        }
    }

}


/** @description
 *  On every sign in event the Auth System will store in the local-storage an object 
 *  with the fileds 'sign_p' (provider) and 'sign_t' (token), we refer to that object as 'signData'.
 *  The class that in charge on all related actions is 'SignDeclaretionManeger'.
 */
class SignDeclaretionManeger {
    private readonly providerKeyName = 'sign_p';
    private readonly tokenKeyName = 'sign_t';

    public declareSignData(signData: {providerName: string, token: string}): void {
        localStorage.setItem(this.providerKeyName, signData.providerName);
        localStorage.setItem(this.tokenKeyName, signData.token);
        
    }
 
    public undeclareSignData(): void {
        localStorage.removeItem(this.providerKeyName);
        localStorage.removeItem(this.tokenKeyName);
    }

    public isDeclared(): boolean {
        return localStorage.getItem(this.providerKeyName) != undefined;
    }

    public getDeclaredSignData(): {providerName: string, token: string} {
        return {
            providerName: localStorage.getItem(this.providerKeyName), 
            token: localStorage.getItem(this.tokenKeyName)
        };
    }
}
