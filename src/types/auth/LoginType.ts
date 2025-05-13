export interface LoginRequestData {
    email: string;
    password: string;
}

export interface LoginResponseData {
    accessToken: string;
    refreshToken: string;
}