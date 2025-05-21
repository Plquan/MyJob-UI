import http from "../ultils/axios/axiosCustom";
import type { IApiResponse } from "../types/AppType";
import type { ILoginRequestData, ICandidateRegisterRequestData, ICompanyRegisterRequestData, ILoginResponseData } from "../types/auth/AuthType";


const candidateLogin = async (data: ILoginRequestData): Promise<IApiResponse<any>> => {
   try {
    const response:  IApiResponse<any> = await http.post("/auth/login/candidate", data);
    return response;
   } catch (error:any) {
    throw error.response.data;
   }
}
const companyLogin = async (data: ILoginRequestData): Promise<IApiResponse<any>> => {
    try {
     const response:  IApiResponse<any> = await http.post("/auth/login/company", data);
     return response;
    } catch (error:any) {
     throw error.response.data;
    }
 }
const candidateRegister = async (data: ICandidateRegisterRequestData): Promise<IApiResponse<any>> => {
    try {
        const response: IApiResponse<any> = await http.post("/auth/register/candidate", data);
        return response;
    } catch (error: any) {
        throw error.response.data;
    }
}
const companyRegister = async (data: ICompanyRegisterRequestData): Promise<IApiResponse<any>> => {
    try {
        const response: IApiResponse<any> = await http.post("/auth/register/company", data);
        return response;
    } catch (error: any) {
        throw error.response.data;
    }
}

const authService = {
    candidateLogin,
    companyLogin,
    candidateRegister,
    companyRegister
  };
export default authService;