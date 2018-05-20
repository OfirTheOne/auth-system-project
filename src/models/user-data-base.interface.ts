import { Provider } from './provider.enum';
export interface UserDataBase {
    _id;
    userName: string, 
    email: string,
    provider: Provider,
    personalData?: {
        firstName: string, 
        lastName: string, 
        gender: string, 
        birthDate: {
            day: Number,
            month: Number,
            year: Number
        }
    } 


}