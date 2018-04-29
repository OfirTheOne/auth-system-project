import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';

import { UserApiService } from '../user-api/user-api.service';

import { AuthService } from '../auth-service.interface';
import { UserDataBase } from '../../models/user-data-base.interface';
import { Provider } from '../../models/provider.enum';
import { AuthResponse } from '../../models/custom-auth-models/auth-response.interface';

@Injectable()
export class CustomAuthService implements AuthService {

    private udb: UserDataBase;

    constructor(private userApi: UserApiService) { }

    //#region - user actions / talk with server
    public async onSignIn(params: signInParams): Promise<AuthResponse> {
        let res;
        try {
            res = await this.userApi.postSignInUser(Provider.CUSTOM_PROVIDER, params.data);
            console.log(res, res.body.data.tokenData);
            this.setSession(res.body.data.tokenData);
            this.udb = res.body.data.user; 
            return res.body.data;
        } catch (e) {
            console.log(e);
            throw e;
        }

    }

    public async onSignOut(): Promise<void> {
        const headers = this.getAuthHeader();

        // first token removeing from local storage than removing from the db, UX consideration

        this.removeTokenFromLocal();
        try {
            const res = await this.userApi.deleteUserCurToken(headers);
            console.log(res);
            
        } catch (e) {
            console.log(e);
            throw e;
        }

    }

    //#endregion

    public isSignIn(): boolean {
        const tokenStatus = moment().isBefore(this.getExpiration());
        if (!tokenStatus) {
            this.removeTokenFromLocal();
        }
        return tokenStatus && this.udb != undefined;
    }

    public getProfile(): UserDataBase {
        return this.udb;
    }

    public getProvider(): Provider {
        return Provider.CUSTOM_PROVIDER;
    }

    public getAuthHeader(): HttpHeaders {
        return new HttpHeaders({ 'x-auth': this.getToken(), 'x-provider': 'custom' })
    }
    

    //#region - private methods - token related 
    private getToken() {
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
    //#endregion 

}

interface signInParams {
    data: {
        email,
        password,
        firstName?,
        lastName?,
    }
}