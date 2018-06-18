import { EnvironmentService } from './../environment/environment.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';

// import { API_URL } from "../../data/auth-data"
import { AuthResponse } from '../../models/custom-auth-models/auth-response.interface';
import { ServerResponse } from '../../models/custom-auth-models/server-response.interface';
import { Provider } from '../../models/provider.enum';

@Injectable()
export class UserApiService {

    private readonly curSubRoute = 'users/';

    constructor(private environment: EnvironmentService, private httpClient: HttpClient) { }

    /************************ public ************************/

    public async postSignInUser(provider: Provider, requestBody: { email: string, password: string } | { idToken: string })
        : Promise<HttpResponse<ServerResponse<AuthResponse>>> {
        console.log(`postSignUpUser(${provider}, ${requestBody})`);
        const queryUrl = this.environment.get('API_URL') + this.curSubRoute +
            this.getRouteByProvider(provider);
        try {
            const res = await this.httpClient.post<ServerResponse<AuthResponse>>(queryUrl, requestBody,
                { observe: 'response' }).toPromise();
            console.log(res);
            return res;

        } catch (e) {
            throw e;
        }
    }

    // TODO : delete return undefined need to change  
    // had a problom parsing the body of the request as a json , so
    // removing. in the option of the request, the observe, and adding responseType: 'text' fix it.
    public async deleteUserCurToken(headers: HttpHeaders)
        : Promise<Object> {
        console.log(`deleteUserCurToken(${headers})`);
        const queryUrl = this.environment.get('API_URL') + this.curSubRoute + 'me/' + 'token/';

        try {
            const res = await this.httpClient.request('DELETE', queryUrl,
                { headers, responseType: 'text' }).toPromise();
            console.log(res);
            return res;
        } catch (e) {
            throw e;
        }
    }

    public async getUserData(headers: HttpHeaders)
        : Promise<AuthResponse> {
        console.log(`getUserData(${headers})`);
        const queryUrl = this.environment.get('API_URL') + this.curSubRoute + 'me/';
        try {
            const res = await this.httpClient.get<ServerResponse<AuthResponse>>(queryUrl,
                { headers, observe: 'response' }).toPromise();
            console.log(res);
            return res.body.data;
        } catch (e) {
            throw e;
        }
    }


    public async postUserData(headers: HttpHeaders, requestBody: { data: { firstName?, lastName?, birthDate?, gender?} }) {
        console.log(`postUserData(${headers}, ${requestBody})`);
        const queryUrl = this.environment.get('API_URL') + this.curSubRoute + 'data/';
        try {
            const res = await this.httpClient.post(queryUrl, requestBody,
                { headers, responseType: 'text' }).toPromise();
            console.log(res);
            return res;
        } catch (e) {
            throw e;
        }
    }

    public async postRenewToken(headers: HttpHeaders, requestBody: { newToken: string }) {
        console.log(`postRenewToken(${headers}, ${requestBody})`);
        const queryUrl = this.environment.get('API_URL') + this.curSubRoute + 'me/token/';
        try {
            const res = await this.httpClient.post(queryUrl, requestBody,
                { headers, responseType: 'text' }).toPromise();
            console.log(res);
            return res;
        } catch (e) {
            throw e;
        }
    }


    /************************ private ************************/

    private getRouteByProvider(provider: Provider): String {
        switch (provider) {
            case Provider.CUSTOM_PROVIDER:
                return 'c/';
            case Provider.GOOGLE_PROVIDER:
                return 'g/';
            case Provider.FACEBOOK_PROVIDER:
                return 'f/';
            default:
                return '';
        }
    }

}