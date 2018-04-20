import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';

import { AuthService } from '../auth-service.interface';
import { Profile } from '../../models/profile.interface';
import { Provider } from '../../models/provider.enum';
import { UserApiService } from '../user-api/user-api.service';

@Injectable()
export class CustomAuthService implements AuthService {

    constructor(private userApi: UserApiService) { }

    //#region - public methods
    public async onSignIn(params: signInParams): Promise<boolean> {
        let res;
        try {
            res = await this.userApi.postSignInUser(Provider.CUSTOM_PROVIDER, params.data);
            console.log(res, res.body.data.tokenData);
            this.setSession(res.body.data.tokenData);
            return true;
        } catch (e) {
            console.log(e);
            throw e;
        }

    }

    public async onSignOut(): Promise<boolean> {
        const headers = this.getAuthHeader();
        // firs remove tken from local storage than removing from the db, UX consideration
        this.removeTokenFromLocal();
        try {
            const res = await this.userApi.deleteUserCurToken(headers);
            console.log(res);
            return true;
        } catch (e) {
            console.log(e);
            throw e;
        }

    }

    public isSignIn(): boolean {
        const tokenStatus = moment().isBefore(this.getExpiration());
        if (!tokenStatus) {
            this.removeTokenFromLocal();
        }
        return tokenStatus;
    }

    public getProfile(): Profile {
        return null;
    }

    public getProvider(): Provider {

        return Provider.CUSTOM_PROVIDER;
    }

    public getAuthHeader(): HttpHeaders {
        return new HttpHeaders({ 'x-auth': this.getToken() })
    }
    //#endregion

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