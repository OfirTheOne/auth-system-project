export interface UserAuthData {
    access_token: string,
    expires_at: number,
    expires_in: number,
    first_issued_at: number,
    id_token: string,
    idpId: string,
    login_hint: string,
    scope: string,
    session_state: { extraQueryParams: { authuser: string } }
    token_type: string,
}