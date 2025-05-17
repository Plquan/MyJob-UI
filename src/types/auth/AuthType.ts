import type { ICompanyData } from "../company/CompanyType";

export interface ILoginRequestData {
    email: string;
    password: string;
}

export interface ILoginResponseData {
    accessToken: string;
    refreshToken: string;
}

export interface ICompanyRegisterRequestData {
    email:string;
    fullName: string;
    password: string;
    companyInfo?:ICompanyData
}
export interface ICandidateRegisterRequestData {
    email:string;
    fullName: string;
    password: string;
}

export interface ICurrentUser {
    id: number;
    groupRoleId: number;
    avatarId?: number;
    email: string;
    fullName: string;
    isActive: boolean;
}