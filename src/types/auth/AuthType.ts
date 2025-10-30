import type { EUserRole } from "../../constant/role";
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
    id: number
    avatar: string
    email: string
    fullName: string
    roleName:EUserRole
    allowSearch:boolean
    isStaff:boolean
    isActive: boolean
    companyId: number
}