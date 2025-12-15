import type { EUserRole } from "../../constant/role";
import type { ICandidate } from "../candidate/CandidateType";
import type { ICompanyData } from "../company/CompanyType";

export interface ILoginRequestData {
    email: string;
    password: string;
    role: EUserRole
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
    role:EUserRole
    allowSearch:boolean
    isStaff:boolean
    isActive: boolean
    company?: ICompanyData
    candidate?:ICandidate
}