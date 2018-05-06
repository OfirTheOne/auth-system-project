declare var ENV: any;

const env: any = ENV;
export { env as ENV };

export interface ProcessEnv {
    [key: string]: string | undefined;
}