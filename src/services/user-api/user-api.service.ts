import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import { API_URL } from "../../data/auth-data"
import { AuthResponse } from '../../models/custom-auth-models/auth-response.interface';
import { ServerResponses } from '../../models/custom-auth-models/server-response.interface';
import { Provider } from '../../models/provider.enum';

@Injectable()
export class UserApiService {

    private readonly curSubRoute = 'users/';

    constructor(private httpClient: HttpClient) { }


    public async postSignInUser(provider: Provider, requestBody: { email: string, password: string } | {idToken: string})
        : Promise<HttpResponse<ServerResponses<AuthResponse>>> {
        console.log(`postSignUpUser(${provider}, ${requestBody})`);
        const queryUrl = API_URL + this.curSubRoute + this.getRouteByProvider(provider);
        try {
            const res = await this.httpClient.post<ServerResponses<AuthResponse>>(queryUrl, requestBody,
                { observe: 'response' }).toPromise();
            console.log(res);
            return res;
        } catch (e) {
            throw e;
        }
    }

    // had a problom parsing the body of the request as a json , so
    // removing. in the option of the request, the observe, and adding responseType: 'text' fix it.
    public async deleteUserCurToken(headers: HttpHeaders)
        : Promise<Object> {
        console.log(`deleteLogOutUser(${headers})`);
        const queryUrl = API_URL + this.curSubRoute + 'me/' + 'token/';
        try {
            const res = await this.httpClient.delete(queryUrl,
                { headers, responseType: 'text' }).toPromise();
            console.log(res);
            return res;
        } catch (e) {
            throw e;
        }
    }

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