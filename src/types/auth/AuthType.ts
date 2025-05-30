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
    avatar?: string | null;
    email: string;
    fullName: string;
    roleName:string,
    isStaff:boolean,
    isActive: boolean;
}