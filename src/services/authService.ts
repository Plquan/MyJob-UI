import http from "../ultils/axios/axiosCustom";
import type { IApiResponse } from "../types/AppType";
import type { ILoginRequestData, ICandidateRegisterRequestData, ICompanyRegisterRequestData } from "../types/auth/AuthType";


const candidateLogin = async (data: ILoginRequestData): Promise<string> => {
   try {
    const response:  string = await http.post("/auth/login/candidate", data);
    return response;
   } catch (error:any) {
    throw error.response.data;
   }
}
const companyLogin = async (data: ILoginRequestData): Promise<string> => {
    try {
     const response:  string = await http.post("/auth/login/company", data);
     return response;
    } catch (error:any) {
     throw error.response.data;
    }
 }
const candidateRegister = async (data: ICandidateRegisterRequestData): Promise<boolean> => {
    try {
        const response: boolean = await http.post("/auth/register/candidate", data);
        return response;
    } catch (error: any) {
        throw error.response.data;
    }
}
const companyRegister = async (data: ICompanyRegisterRequestData): Promise<string> => {
    try {
        const response: string = await http.post("/auth/register/employer", data);
        return response;
    } catch (error: any) {
        throw error.response.data;
    }
}

const logout = async (): Promise<boolean> => {
    try {
        const response: boolean = await http.post("/auth/logout");
        return response;
    } catch (error: any) {
        throw error.response.data;
    }
}


const authService = {
    candidateLogin,
    companyLogin,
    candidateRegister,
    companyRegister,
    logout
  };
export default authService;