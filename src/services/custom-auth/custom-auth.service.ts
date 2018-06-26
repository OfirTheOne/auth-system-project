import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';

import { UserApiService } from '../user-api/user-api.service';
import { AuthStrategyService } from '../auth-strategy-service.abstract';

import { Provider } from '../../models/provider.enum';
import { UserDataBase } from '../../models/user-data-base.interface';
import { AuthResponse } from '../../models/custom-auth-models/auth-response.interface';
import { ServerResponse } from '../../models/custom-auth-models/server-response.interface';

@Injectable()
export class CustomAuthStrategyService extends AuthStrategyService {

    constructor(userApi: UserApiService) {
        super(Provider.CUSTOM_PROVIDER, 'custom', userApi);
    }

    public async onSignIn(params?: {email, password }): Promise<UserDataBase> {
        console.log(`CAS.getAuthHeader(${params})`);

        let res;
        try {
            res = await this._signInToServer({data: params})
            // userApi.postSignInUser(Provider.CUSTOM_PROVIDER, params.data);
            console.log(res, res.body.data.tokenData);
            this.setSession(res.body.data.tokenData);
            this.userDbProfile = res.body.data.user; 
            return res.body.data.user;
        } catch (e) {
            console.log(e);
            throw e;
        }

    }

    public async onSignOut(): Promise<void> {
        console.log(`CAS.onSignOut()`);

        const headers = this.getAuthHeader();

        // first token removeing from local storage than removing from the db, UX consideration

        this.removeTokenFromLocal();
        try {
            const res = await this._signOutFromServer(headers);
            console.log(res);
            
        } catch (e) {
            console.log(e);
            throw e;
        }

    }

    public isSignIn(): boolean {
        //console.log(`CAS.isSignIn()`);
        const tokenStatus = moment().isBefore(this.getExpiration());
        if (!tokenStatus) {
            this.removeTokenFromLocal();
        }
        return tokenStatus && this.userDbProfile != undefined;
    }

    public getAuthHeader(): HttpHeaders {
        console.log(`CAS.getAuthHeader()`);

        return this._buildAuthHeader({token: this.getToken(), providerName: this.getProviderName() });
    }
    
    protected authenticateServerResponse(res: AuthResponse): boolean {
        return true;
    }


    // ************************************************************************ //
    // ************************************************************************ //
    // ************************************************************************ //
    // ************************************************************************ //
    // ************************************************************************ //
    // ************************************************************************ //

    
    public getToken(): string {
        return localStorage.getItem('token');
    }

    private setSession(authResult): void {
        const expiresAt = moment.unix(authResult.expDate);;
        localStorage.setItem('token', authResult.token);
        localStorage.setItem("exp_date", JSON.stringify(expiresAt.valueOf()));
    }

    private getExpiration(): moment.Moment {
        const expiration = localStorage.getItem("exp_date");
        const expiresAt = JSON.parse(expiration);

        return moment(expiresAt);
    }

    private removeTokenFromLocal(): void {
        localStorage.removeItem("token");
        localStorage.removeItem("exp_date");
    }
}

