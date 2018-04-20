import { Provider } from "./provider.enum";

export interface Profile {
    email: string,
    id: string,
    fullName: string,
    givenName: string,
    familyName: string,
    imageUrl: string,
    provider: Provider
}