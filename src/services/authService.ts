import http from "../ultils/axios/axiosCustom";
import type { ApiResponse } from "../types/AppType";
import type { LoginRequestData, LoginResponseData } from "../types/auth/LoginType";


const login = async (data: LoginRequestData): Promise<ApiResponse<LoginRequestData>> => {
   try {
    const response:  ApiResponse<LoginRequestData> = await http.post("/auth/login", data);
    return response;
   } catch (error:any) {
    throw error.response.data;
   }
}

const authService = {
    login,
  };
  export default authService;